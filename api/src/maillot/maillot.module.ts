import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaillotController } from './maillot.controller';
import { MaillotEntity } from './maillot.entity';
import { MaillotService } from './maillot.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaillotEntity])],
  controllers: [MaillotController],
  providers: [MaillotService],
  exports: [MaillotService],
})
export class MaillotModule {}
