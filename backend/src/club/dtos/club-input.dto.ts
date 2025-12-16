import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClubCreateDto {
  @ApiProperty({
    description: 'The name of the club',
    type: String,
    default: 'Arsenal',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The country of the club',
    type: String,
    default: 'Angleterre',
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}
