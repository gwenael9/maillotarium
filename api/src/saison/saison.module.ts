import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaisonEntity } from './saison.entity';
import { SaisonService } from './saison.service';

@Module({
  imports: [TypeOrmModule.forFeature([SaisonEntity])],
  controllers: [],
  providers: [SaisonService],
  exports: [SaisonService],
})
export class SaisonModule {}
