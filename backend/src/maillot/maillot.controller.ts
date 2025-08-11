import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
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
    @Query('club') club,
    @Query('saison') saison,
    @Query('marque') marque,
  ): Promise<PaginatedMaillotResponseDto> {
    const { data, total } = await this.maillotService.findAll({
      skip: (page - 1) * limit,
      take: limit,
      clubId: club,
      saisonId: saison,
      marque,
    });

    return {
      data: plainToInstance(MaillotResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      total,
    };
  }
}
