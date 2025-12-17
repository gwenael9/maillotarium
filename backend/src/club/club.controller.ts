import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ClubService } from './club.service';
import {
  ClubResponseDto,
  PaginatedClubResponseDto,
} from './dtos/club-response.dto';
import { ClubCreateDto } from './dtos/club-input.dto';
import { MessageResponse } from '@/common/types/message';

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
    @Query('country_code') country_code: string,
  ): Promise<PaginatedClubResponseDto> {
    const { data, total } = await this.clubService.findAll({
      skip: (page - 1) * limit,
      take: limit,
      country_code,
    });

    return {
      data: plainToInstance(ClubResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      total,
    };
  }

  @Get('country')
  @ApiOperation({ summary: 'Get all country' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a string array of all country in db',
  })
  async findAllCountry(): Promise<{ country: string[] }> {
    const country = await this.clubService.findAllCountry();
    return { country };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one club' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns one club',
  })
  async findOne(@Param('id') id: string): Promise<ClubResponseDto> {
    return await this.clubService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new club' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The club has been successfully created.',
    type: ClubResponseDto,
  })
  async create(@Body() createClubDto: ClubCreateDto): Promise<MessageResponse> {
    const newClub = await this.clubService.create(createClubDto);
    return { message: `Le club ${newClub.name} a bien été créé.` };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a club' })
  @ApiResponse({
    description: 'The club has been successfully updated.',
    type: ClubResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateClubDto: Partial<ClubCreateDto>,
  ): Promise<ClubResponseDto> {
    const updatedClub = await this.clubService.update(id, updateClubDto);
    return plainToInstance(ClubResponseDto, updatedClub, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a club' })
  @ApiResponse({
    description: 'The club has been successfully deleted.',
    type: ClubResponseDto,
  })
  async delete(@Param('id') id: string): Promise<MessageResponse> {
    const clubToDelete = await this.clubService.remove(id);
    return { message: `Le club ${clubToDelete.name} a bien été supprimé.` };
  }
}
