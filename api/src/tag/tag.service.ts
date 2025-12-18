import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto, TagUpdateDto } from './dtos/tag-input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { PaginationResponse } from '@/common/types/pagination';
import { verifIfHasChanges } from '@/common/services/update';

type TagFindAllOptions = FindManyOptions<TagEntity>;

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(
    options?: TagFindAllOptions,
  ): Promise<PaginationResponse<TagEntity>> {
    const [data, total] = await this.tagRepository.findAndCount({
      skip: options?.skip,
      take: options?.take,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<TagEntity> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag introuvable.');
    }
    return tag;
  }

  async create(createTagDto: CreateTagDto): Promise<TagEntity> {
    const existingTag = await this.tagRepository.findOne({
      where: { name: createTagDto.name },
    });
    if (existingTag) {
      throw new ConflictException(`Le tag "${createTagDto.name}" existe déjà.`);
    }
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  async update(id: string, updateTagDto: TagUpdateDto): Promise<TagEntity> {
    const tag = await this.findOne(id);

    verifIfHasChanges<TagEntity>(updateTagDto, tag);

    if (updateTagDto.name) {
      const existingTag = await this.tagRepository.findOne({
        where: { name: updateTagDto.name, id: Not(id) },
      });
      if (existingTag) {
        throw new ConflictException(
          `Le tag "${updateTagDto.name}" existe déjà.`,
        );
      }
    }

    const updatedTag = this.tagRepository.merge(tag, updateTagDto);
    return await this.tagRepository.save(updatedTag);
  }

  async remove(id: string): Promise<TagEntity> {
    const tag = await this.findOne(id);
    return await this.tagRepository.remove(tag);
  }
}
