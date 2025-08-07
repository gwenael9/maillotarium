import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaillotEntity } from './maillot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaillotEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class MaillotModule {}
