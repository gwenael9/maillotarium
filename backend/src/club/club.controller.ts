import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ClubService } from './club.service';
import {
  ClubResponseDto,
  PaginatedClubResponseDto,
} from './dtos/club-response.dto';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  @ApiOperation({ summary: 'Get all clubs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all clubs',
    type: PaginatedClubResponseDto,
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedClubResponseDto> {
    const { data, total } = await this.clubService.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: plainToInstance(ClubResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      total,
    };
  }
}
