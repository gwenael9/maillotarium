import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
  Patch,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, TagUpdateDto } from './dtos/tag-input.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  PaginatedTagResponseDto,
  TagResponseDto,
} from './dtos/tag-response.dto';
import { plainToInstance } from 'class-transformer';
import { MessageResponse } from '@/common/types/message';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all tags',
    type: PaginatedTagResponseDto,
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedTagResponseDto> {
    const { data, total } = await this.tagService.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: plainToInstance(TagResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      total,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one tag' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return one tag',
    type: TagResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<TagResponseDto> {
    return await this.tagService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le tag X a bien été créé.',
    type: TagResponseDto,
  })
  async create(@Body() createTagDto: CreateTagDto): Promise<MessageResponse> {
    const tag = await this.tagService.create(createTagDto);
    return { message: `Le tag ${tag.name} a bien été créé.` };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tag' })
  @ApiResponse({
    description: 'Le tag X a bien été modifié.',
    type: TagResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTagDto: TagUpdateDto,
  ): Promise<TagResponseDto> {
    const updatedTag = await this.tagService.update(id, updateTagDto);
    return plainToInstance(TagResponseDto, updatedTag, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiResponse({
    description: 'Le tag X a bien été supprimé.',
    type: TagResponseDto,
  })
  async remove(@Param('id') id: string): Promise<MessageResponse> {
    const tagToDelete = await this.tagService.remove(id);
    return { message: `Le tag ${tagToDelete.name} a bien été supprimé.` };
  }
}
