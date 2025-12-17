import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class TagResponseDto {
  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'id du tag',
    type: String,
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'nom du tag',
    example: 'Vintage',
    type: String,
  })
  name: string;
}

// TODO: generic paginated DTO
export class PaginatedTagResponseDto {
  @ApiProperty({ type: [TagResponseDto] })
  data: TagResponseDto[];

  @ApiProperty()
  total: number;
}
