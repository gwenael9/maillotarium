import { Injectable } from '@nestjs/common';
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
}
