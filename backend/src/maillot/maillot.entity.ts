import { ClubEntity } from '@/club/club.entity';
import { SaisonEntity } from '@/saison/saison.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const TypeMaillot = {
  HOME: 'domicile',
  AWAY: 'extérieur',
  THIRD: 'troisième',
} as const;

export type TypeMaillot = keyof typeof TypeMaillot;

@Entity('maillot')
export class MaillotEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ClubEntity, (club) => club.maillots, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'clubId' })
  club?: ClubEntity;

  @Column({ nullable: true })
  clubId: string;

  @ManyToOne(() => SaisonEntity, (saison) => saison.maillots, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'saisonId' })
  saison?: SaisonEntity;

  @Column({ nullable: true })
  saisonId: string;

  @Column({
    type: 'enum',
    enum: TypeMaillot,
    default: TypeMaillot.HOME,
  })
  type_maillot: TypeMaillot;

  @Column()
  image_url: string;

  @Column()
  marque: string;

  @Column({ type: 'jsonb', nullable: true })
  palette_couleur?: string[];
}
