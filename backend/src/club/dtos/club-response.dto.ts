import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class ClubResponseDto {
  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'id du club',
    type: String,
  })
  id: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'nom du club',
    example: 'Arsenal',
    type: String,
  })
  name: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'pays du club',
    example: 'Angleterre',
    type: String,
  })
  country: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'code pays du club',
    example: 'fr',
    type: String,
  })
  country_code: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'logo du club',
    type: String,
  })
  logo_url: string;
}

export class PaginatedClubResponseDto {
  @ApiProperty({ type: [ClubResponseDto] })
  data: ClubResponseDto[];

  @ApiProperty()
  total: number;
}
