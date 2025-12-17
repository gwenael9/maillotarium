import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  MaillotResponseDto,
  PaginatedMaillotResponseDto,
} from './dtos/maillot-response.dto';
import { MaillotService } from './maillot.service';

@Controller('maillot')
export class MaillotController {
  constructor(private readonly maillotService: MaillotService) {}

  @Get()
  @ApiOperation({ summary: 'Get all maillots' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all maillots',
    type: PaginatedMaillotResponseDto,
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('clubId') clubId: string,
    @Query('saisonId') saisonId: string,
    @Query('marque') marque: string,
    @Query('resolve') resolve: boolean,
  ): Promise<PaginatedMaillotResponseDto> {
    const { data, total } = await this.maillotService.findAll({
      skip: (page - 1) * limit,
      take: limit,
      clubId,
      saisonId,
      marque,
      resolve,
    });

    return {
      data: plainToInstance(MaillotResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      total,
    };
  }

  @Get('club/:clubId/saison/:saisonId')
  async findThreeBySaisonAndClub(
    @Param('clubId') clubId: string,
    @Param('saisonId') saisonId: string,
  ): Promise<MaillotResponseDto[]> {
    const { data } = await this.maillotService.findAll({ clubId, saisonId });
    return plainToInstance(MaillotResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
