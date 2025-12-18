import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { MaillotEntity } from './maillot.entity';
import { PaginationResponse } from '@/common/types/pagination';
import { CreateMaillotDto } from './dtos/maillot-input.dto';
import { TagEntity } from '@/tag/tag.entity';
import { ClubService } from '@/club/club.service';
import { ClubEntity } from '@/club/club.entity';
import { SaisonService } from '@/saison/saison.service';
import { SaisonEntity } from '@/saison/saison.entity';
import { S3Service } from '@/s3/s3.service';

export interface MaillotFindAllOptions extends FindManyOptions<MaillotEntity> {
  clubId?: string;
  saisonId?: string;
  marque?: string;
  resolve?: boolean;
}

@Injectable()
export class MaillotService {
  constructor(
    @InjectRepository(MaillotEntity)
    private maillotRepository: Repository<MaillotEntity>,
    private clubService: ClubService,
    private saisonService: SaisonService,
    private s3Service: S3Service,
  ) {}

  async findAll(
    options?: MaillotFindAllOptions,
  ): Promise<PaginationResponse<MaillotEntity>> {
    const [data, total] = await this.maillotRepository.findAndCount({
      where: {
        clubId: options?.clubId,
        saisonId: options?.saisonId,
        marque: options?.marque,
      },
      skip: options?.skip,
      take: options?.take,
      relations: options?.resolve ? ['club', 'saison', 'tags'] : [],
    });

    return { data, total };
  }

  async findOne(id: string, withRelations: boolean): Promise<MaillotEntity> {
    const maillot = await this.maillotRepository.findOne({
      where: { id },
      relations: withRelations ? ['club', 'saison', 'tags'] : [],
    });

    if (!maillot) throw new NotFoundException('Maillot inconnu');
    return maillot;
  }

  async create(
    createMaillotDto: CreateMaillotDto,
  ): Promise<{ uploadUrl: string }> {
    const club = await this.clubService.findOne(createMaillotDto.clubId);
    const saison = await this.saisonService.findOne(createMaillotDto.saisonId);

    const fileKey = this.generateS3Key(
      club,
      saison,
      `${createMaillotDto.type_maillot}.png`,
    );

    const uploadUrl = await this.s3Service.generatePresignedUrl(
      fileKey,
      'image/png',
    );

    const imageUrl = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${fileKey}`;

    // TODO: pour le champ palette, service qui récupère les couleurs dominantes de l'image? puis stocke en RVB ou HEX en base
    const newMaillot = this.maillotRepository.create({
      ...createMaillotDto,
      image_url: imageUrl,
      tags: createMaillotDto.tagIds?.map((id) => ({ id }) as TagEntity),
    });

    await this.maillotRepository.save(newMaillot);

    return { uploadUrl };
  }

  private generateS3Key(
    club: ClubEntity,
    saison: SaisonEntity,
    fileName: string,
  ): string {
    const s2 = saison.anneeDebut.toString().slice(-2);
    const e2 = saison.anneeFin.toString().slice(-2);
    const saisonName = `${s2}${e2}`;

    return `${club.country}/${club.name}/${saisonName}/${fileName}`
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  // TODO: Ajouter une méthode pour mettre à jour les tags d'un maillot (ou une méthode générique de mise à jour)

  // TODO: Ajouter une méthode pour supprimer un maillot (et l'image associée dans le bucket S3)
}
