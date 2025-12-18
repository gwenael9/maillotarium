import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  MaillotResponseDto,
  PaginatedMaillotResponseDto,
} from './dtos/maillot-response.dto';
import { MaillotService } from './maillot.service';
import { MessageResponse } from '@/common/types/message';
import { CreateMaillotDto } from './dtos/maillot-input.dto';

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

  @Get(':id')
  @ApiOperation({ summary: 'Get one maillot' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns one maillot',
  })
  async findOne(
    @Param('id') id: string,
    @Query('resolve') resolve: boolean,
  ): Promise<MaillotResponseDto> {
    const maillot = await this.maillotService.findOne(id, resolve);
    return plainToInstance(MaillotResponseDto, maillot, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a maillot' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le maillot a bien été ajouté.',
    type: MaillotResponseDto,
  })
  async create(
    @Body() createMaillotDto: CreateMaillotDto,
  ): Promise<MessageResponse> {
    await this.maillotService.create(createMaillotDto);
    return {
      message: `Le maillot a bien été ajouté.`,
    };
  }
}
