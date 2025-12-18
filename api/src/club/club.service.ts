import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ClubEntity } from './club.entity';
import { ClubCreateDto } from './dtos/club-input.dto';
import { PaginationResponse } from '@/common/types/pagination';
import { allOptions, BaseService } from '@/common/services/base.service';

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
    const existingClub = await this.clubRepository.findOne({
      where: {
        name: createClubDto.name,
        country: createClubDto.country,
      },
    });

    if (existingClub) {
      throw new ConflictException(
        `Le club "${createClubDto.name}" existe déjà en ${createClubDto.country}.`,
      );
    }
    const newClub = this.clubRepository.create({
      ...createClubDto,
      country_code: getCountryCode(createClubDto.country),
    });
    return await this.clubRepository.save(newClub);
  }

  // TODO: quand on modifie le pays, modifier le code pays automatiquement

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

// TODO: utiliser une vraie bibliothèque pour ça
function getCountryCode(country: string): string {
  return country.slice(0, 2).toLowerCase();
}
