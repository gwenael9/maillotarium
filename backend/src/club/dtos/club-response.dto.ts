import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { LigueType } from '../club.entity';

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
  nom: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'pays du club',
    example: 'Angleterre',
    type: String,
  })
  pays: string;

  @Expose()
  @ApiProperty({
    description: 'ligue du club',
    example: LigueType.angleterre,
    enum: LigueType,
    enumName: 'LigueType',
  })
  ligue: LigueType;
}

export class PaginatedClubResponseDto {
  @ApiProperty({ type: [ClubResponseDto] })
  data: ClubResponseDto[];

  @ApiProperty()
  total: number;
}
