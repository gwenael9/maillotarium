import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { MaillotEntity } from './maillot.entity';

export interface MaillotFindAllOptions extends FindManyOptions<MaillotEntity> {
  clubId?: string;
  saisonId?: string;
  marque?: string;
}

@Injectable()
export class MaillotService {
  constructor(
    @InjectRepository(MaillotEntity)
    private maillotRepository: Repository<MaillotEntity>,
  ) {}

  async findAll(
    options?: MaillotFindAllOptions,
  ): Promise<{ data: MaillotEntity[]; total: number }> {
    const [data, total] = await this.maillotRepository.findAndCount({
      where: {
        clubId: options?.clubId,
        saisonId: options?.saisonId,
        marque: options?.marque,
      },
      skip: options?.skip,
      take: options?.take,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<MaillotEntity> {
    const maillot = await this.maillotRepository.findOne({
      where: { id },
    });

    if (!maillot) throw new NotFoundException('Maillot inconnu');
    return maillot;
  }
}
