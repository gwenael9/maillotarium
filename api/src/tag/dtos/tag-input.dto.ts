import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    type: String,
    default: 'Vintage',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class TagUpdateDto extends PartialType(CreateTagDto) {}
