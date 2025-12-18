import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TypeMaillot } from '../maillot.entity';

export class CreateMaillotDto {
  @IsUUID()
  clubId: string;

  @IsString()
  saisonId: string;

  @IsEnum(TypeMaillot)
  type_maillot: TypeMaillot;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  marque: string;

  @IsArray()
  @IsOptional()
  palette_couleur?: string[];

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  tagIds?: string[];
}
