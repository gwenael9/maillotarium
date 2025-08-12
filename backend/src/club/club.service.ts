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
    const club = await this.clubRepository.findOne({
      where: { id },
    });

    if (!club) throw new NotFoundException('Club inconnu.');
    return club;
  }

  async findAllCountry(): Promise<string[]> {
    const result: ClubEntity[] = await this.clubRepository
      .createQueryBuilder('club')
      .select('DISTINCT club.pays', 'pays')
      .getRawMany();

    return result
      .map((row) => row.pays.trim().toLowerCase())
      .filter((pays) => pays.length > 0);
  }
}
