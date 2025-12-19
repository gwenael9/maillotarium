import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ClubEntity } from './club.entity';
import { ClubCreateDto, ClubUpdateDto } from './dtos/club-input.dto';
import { PaginationResponse } from '@/common/types/pagination';
import { allOptions, BaseService } from '@/common/services/base.service';
import { getCountryCode } from '@/common/utils/getCountryCode';

interface ClubFindAllOptions extends allOptions<ClubEntity> {
  country_code?: string;
}

@Injectable()
export class ClubService extends BaseService<ClubEntity> {
  constructor(
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
  ) {
    super(clubRepository, 'Club', 'id', ['maillots'], ['name', 'country']);
  }

  async findAll(
    options?: ClubFindAllOptions,
  ): Promise<PaginationResponse<ClubEntity>> {
    const { country_code, ...findOptions } = options;

    const where: FindOptionsWhere<ClubEntity> = {
      ...(country_code && { country_code }),
    };

    options = { ...findOptions, where };
    return super.findAll(options);
  }

  async create(createClubDto: ClubCreateDto): Promise<ClubEntity> {
    const clubData: Partial<ClubEntity> = {
      ...createClubDto,
      country_code: getCountryCode(createClubDto.country),
    };

    return super.create(clubData);
  }

  async update(id: string, updateDto: ClubUpdateDto): Promise<ClubEntity> {
    const clubData: Partial<ClubEntity> = { ...updateDto };

    // si le pays change, on recalcule le code
    if (updateDto.country) {
      clubData.country_code = getCountryCode(updateDto.country);
    }

    return super.update(id, clubData);
  }

  async findAllCountry(): Promise<string[]> {
    const result: ClubEntity[] = await this.clubRepository
      .createQueryBuilder('club')
      .select('DISTINCT club.country', 'country')
      .getRawMany();

    return result
      .map((row) => row.country.trim().toLowerCase())
      .filter((c) => c.length > 0);
  }
}
