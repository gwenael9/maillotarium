import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { MaillotEntity } from './maillot.entity';
import { PaginationResponse } from '@/common/types/pagination';
import { CreateMaillotDto } from './dtos/maillot-input.dto';
import { TagEntity } from '@/tag/tag.entity';

export interface MaillotFindAllOptions extends FindManyOptions<MaillotEntity> {
  clubId?: string;
  saisonId?: string;
  marque?: string;
  resolve?: boolean;
}

@Injectable()
export class MaillotService {
  constructor(
    @InjectRepository(MaillotEntity)
    private maillotRepository: Repository<MaillotEntity>,
  ) {}

  async findAll(
    options?: MaillotFindAllOptions,
  ): Promise<PaginationResponse<MaillotEntity>> {
    const [data, total] = await this.maillotRepository.findAndCount({
      where: {
        clubId: options?.clubId,
        saisonId: options?.saisonId,
        marque: options?.marque,
      },
      skip: options?.skip,
      take: options?.take,
      relations: options?.resolve ? ['club', 'saison', 'tags'] : [],
    });

    return { data, total };
  }

  async findOne(id: string, withRelations: boolean): Promise<MaillotEntity> {
    const maillot = await this.maillotRepository.findOne({
      where: { id },
      relations: withRelations ? ['club', 'saison', 'tags'] : [],
    });

    if (!maillot) throw new NotFoundException('Maillot inconnu');
    return maillot;
  }

  // TODO: gérer le stockage de l'image du maillot (stocker dans le s3 puis récupérer l'url et la stocker en base)
  async create(createMaillotDto: CreateMaillotDto): Promise<void> {
    // TODO: pour le champ palette, service qui récupère les couleurs dominantes de l'image? puis stocke en RVB ou HEX en base
    const newMaillot = this.maillotRepository.create({
      ...createMaillotDto,
      tags: createMaillotDto.tagIds?.map((id) => ({ id }) as TagEntity),
    });

    await this.maillotRepository.save(newMaillot);
  }

  // TODO: Ajouter une méthode pour mettre à jour les tags d'un maillot (ou une méthode générique de mise à jour)
}
