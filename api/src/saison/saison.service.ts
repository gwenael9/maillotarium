import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SaisonEntity } from './saison.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SaisonService {
  constructor(
    @InjectRepository(SaisonEntity)
    private saisonRepository: Repository<SaisonEntity>,
  ) {}

  async findOne(id: string): Promise<SaisonEntity> {
    const saison = await this.saisonRepository.findOne({
      where: { id },
    });

    if (!saison) throw new NotFoundException('Saison inconnue');
    return saison;
  }
}
