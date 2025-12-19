import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  Not,
  Repository,
} from 'typeorm';
import { PaginationResponse } from '../types/pagination';

export interface allOptions<T> extends FindManyOptions<T> {
  resolve?: boolean;
}

export abstract class BaseService<T> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly entityName: string,
    protected readonly key: keyof T,
    protected readonly relations: string[] = [],
    protected readonly uniqueFields: (keyof T)[] = [],
  ) {}

  async findAll(options?: allOptions<T>): Promise<PaginationResponse<T>> {
    const [data, total] = await this.repository.findAndCount({
      ...options,
      relations: options?.resolve ? this.relations : [],
    });
    return { data, total };
  }

  async findOne(id: string, withRelations: boolean = false): Promise<T> {
    const object = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      relations: withRelations ? this.relations : [],
    });
    if (!object) throw new NotFoundException(`${this.entityName} inconnu(e)`);
    return object;
  }

  async create(createDto: Partial<T>): Promise<T> {
    await this.checkUniqueness(null, createDto);
    const object = this.repository.create(createDto as DeepPartial<T>);
    return await this.repository.save(object);
  }

  async update(id: string, updateDto: Partial<T>): Promise<T> {
    const object = await this.findOne(id);

    this.verifIfHasChanges<T>(updateDto, object);

    await this.checkUniqueness(id, updateDto, object);

    const updatedObject = this.repository.merge(
      object,
      updateDto as DeepPartial<T>,
    );
    return await this.repository.save(updatedObject);
  }

  async remove(id: string): Promise<T> {
    const object = await this.findOne(id);
    return await this.repository.remove(object);
  }

  protected verifIfHasChanges<T>(dto: Partial<T>, entity: T): void {
    const message = "Aucune modification n'a été détectée.";

    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException(message);
    }

    const hasChanges = Object.keys(dto).some(
      (key) => dto[key] !== undefined && dto[key] !== entity[key],
    );

    if (!hasChanges) throw new BadRequestException(message);
  }

  protected async checkUniqueness(
    id: string | null,
    dto: Partial<T>,
    object?: T,
  ): Promise<void> {
    const where = {} as FindOptionsWhere<T>;

    for (const field of this.uniqueFields) {
      // si aucune valeur dans le dto, on utilise la valeur en base pour comparer
      const value = dto[field] !== undefined ? dto[field] : object?.[field];

      if (value !== undefined && value !== null) {
        where[field] = ILike(value) as FindOptionsWhere<T>[keyof T];
      }
    }

    if (id) {
      where[this.key] = Not(id) as FindOptionsWhere<T>[keyof T];
    }

    // on cherche un objet identique mais pas avec le même id
    const exists = await this.repository.findOne({ where });

    if (exists) {
      const fieldsList = this.uniqueFields.map(String).join(' + ');
      throw new ConflictException(
        `Un(e) ${this.entityName.toLowerCase()} avec cette combinaison (${fieldsList}) existe déjà.`,
      );
    }
  }
}
