import { ClubEntity } from '@/club/club.entity';
import { SaisonEntity } from '@/saison/saison.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => ClubEntity, { onDelete: 'CASCADE' })
  club: ClubEntity;

  @ManyToOne(() => SaisonEntity, { onDelete: 'CASCADE' })
  saison: SaisonEntity;

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
