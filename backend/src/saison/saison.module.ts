import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaisonEntity } from './saison.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaisonEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SaisonModule {}
