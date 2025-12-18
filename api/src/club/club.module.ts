import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubController } from './club.controller';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity])],
  controllers: [ClubController],
  providers: [ClubService],
  exports: [ClubService],
})
export class ClubModule {}
