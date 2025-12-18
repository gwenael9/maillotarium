import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaillotController } from './maillot.controller';
import { MaillotEntity } from './maillot.entity';
import { MaillotService } from './maillot.service';
import { ClubModule } from '@/club/club.module';
import { SaisonModule } from '@/saison/saison.module';
import { S3Module } from '@/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaillotEntity]),
    ClubModule,
    SaisonModule,
    S3Module,
  ],
  controllers: [MaillotController],
  providers: [MaillotService],
  exports: [MaillotService],
})
export class MaillotModule {}
