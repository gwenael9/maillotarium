import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { SaisonEntity } from '../saison.entity';

@Exclude()
export class SaisonResponseDto {
  @Expose()
  @Type(() => Number)
  @ApiProperty({
    description: 'id de la saison',
    type: Number,
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'Format de la saison (Début/Fin)',
    example: '2025/2026',
  })
  @Transform(
    ({ obj }: { obj: SaisonEntity }) => `${obj.anneeDebut}/${obj.anneeFin}`,
  )
  value: string;
}
