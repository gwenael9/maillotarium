import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dtos/tag-input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/common/services/base.service';

@Injectable()
export class TagService extends BaseService<TagEntity> {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {
    super(tagRepository, 'Tag', 'id', [], ['name']);
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
}
