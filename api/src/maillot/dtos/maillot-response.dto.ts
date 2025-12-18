import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { TypeMaillot } from '../maillot.entity';
import { TagResponseDto } from '@/tag/dtos/tag-response.dto';
import { ClubResponseDto } from '@/club/dtos/club-response.dto';
import { SaisonResponseDto } from '@/saison/dtos/saison-response.dto';

@Exclude()
export class MaillotResponseDto {
  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'id du maillot',
    type: String,
  })
  id: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'clubId du maillot',
    type: String,
  })
  clubId: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'saisonId du maillot',
    type: String,
  })
  saisonId: string;

  @Expose()
  @ApiProperty({
    description: 'type de maillot du club',
    example: TypeMaillot.HOME,
    enum: TypeMaillot,
    enumName: 'TypeMaillot',
  })
  type_maillot: TypeMaillot;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'image du maillot',
    type: String,
  })
  image_url: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'description du maillot',
    type: String,
  })
  description: string;

  @Expose()
  @Type(() => String)
  @ApiProperty({
    description: 'marque du maillot',
    type: String,
  })
  marque: string;

  @Expose()
  @Type(() => Array)
  @ApiProperty({
    description: 'couleurs du maillot',
    type: [String],
  })
  palette_couleur?: string[];

  @Expose()
  @Type(() => ClubResponseDto)
  club?: ClubResponseDto;

  @Expose()
  @Type(() => TagResponseDto)
  tags?: TagResponseDto[];

  @Expose()
  @Type(() => SaisonResponseDto)
  saison?: SaisonResponseDto;
}

export class PaginatedMaillotResponseDto {
  @ApiProperty({ type: [MaillotResponseDto] })
  data: MaillotResponseDto[];

  @ApiProperty()
  total: number;
}

export class MaillotImageUploadResponseDto {
  @ApiProperty({
    description: "L'URL présignée pour téléverser l'image du maillot",
    type: String,
  })
  uploadUrl: string;

  @ApiProperty({
    description: 'Message de confirmation',
    type: String,
  })
  message: string;
}
