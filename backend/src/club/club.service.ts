import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ClubEntity } from './club.entity';

export interface ClubFIndAllOptions extends FindManyOptions<ClubEntity> {
  skip?: number;
  take?: number;
}

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
  ) {}

  async findAll(
    options?: ClubFIndAllOptions,
  ): Promise<{ data: ClubEntity[]; total: number }> {
    const [data, total] = await this.clubRepository.findAndCount({
      skip: options?.skip,
      take: options?.take,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<ClubEntity> {
    const banc = await this.clubRepository.findOne({
      where: { id },
    });

    if (!banc) throw new NotFoundException('Club inconnu.');
    return banc;
  }
}
