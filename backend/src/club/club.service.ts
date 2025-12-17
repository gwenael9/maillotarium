import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { ClubEntity } from './club.entity';
import { ClubCreateDto } from './dtos/club-input.dto';
import { PaginationResponse } from '@/common/types/pagination';
import { verifIfHasChanges } from '@/common/services/update';

interface ClubFIndAllOptions extends FindManyOptions<ClubEntity> {
  country_code?: string;
}

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
  ) {}

  async findAll(
    options?: ClubFIndAllOptions,
  ): Promise<PaginationResponse<ClubEntity>> {
    const [data, total] = await this.clubRepository.findAndCount({
      skip: options?.skip,
      take: options?.take,
      where: options?.country_code
        ? { country_code: options.country_code }
        : {},
    });

    return { data, total };
  }

  async findOne(id: string): Promise<ClubEntity> {
    const club = await this.clubRepository.findOne({
      where: { id },
    });

    if (!club) throw new NotFoundException('Club inconnu.');
    return club;
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

  async update(
    id: string,
    updateClubDto: Partial<ClubCreateDto>,
  ): Promise<ClubEntity> {
    const club = await this.findOne(id);

    // const hasChanges = Object.keys(updateClubDto).some(
    //   (key) =>
    //     updateClubDto[key] !== undefined && updateClubDto[key] !== club[key],
    // );

    // if (!hasChanges) {
    //   throw new BadRequestException("Aucune modification n'a été détectée.");
    // }

    verifIfHasChanges<ClubEntity>(updateClubDto, club);

    // on vérifie qu'on modifie pas le club en un club déjà existant
    if (updateClubDto.name || updateClubDto.country) {
      const duplicate = await this.clubRepository.findOne({
        where: {
          name: updateClubDto.name ?? club.name,
          country: updateClubDto.country ?? club.country,
          id: Not(id),
        },
      });

      if (duplicate) {
        throw new ConflictException(
          'Un autre club porte déjà ce nom dans ce pays.',
        );
      }
    }

    // TODO: quand on modifie le pays, modifier le code pays automatiquement

    const updatedClub = this.clubRepository.merge(club, updateClubDto);
    return await this.clubRepository.save(updatedClub);
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

  async remove(id: string): Promise<ClubEntity> {
    const club = await this.findOne(id);
    return await this.clubRepository.remove(club);
  }
}

// TODO: utiliser une vraie bibliothèque pour ça
function getCountryCode(country: string): string {
  return country.slice(0, 2).toLowerCase();
}
