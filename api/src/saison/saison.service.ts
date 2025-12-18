import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SaisonEntity } from './saison.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/common/services/base.service';

@Injectable()
export class SaisonService extends BaseService<SaisonEntity> {
  constructor(
    @InjectRepository(SaisonEntity)
    private saisonRepository: Repository<SaisonEntity>,
  ) {
    super(saisonRepository, 'Saison', 'id', [], []);
  }
}
