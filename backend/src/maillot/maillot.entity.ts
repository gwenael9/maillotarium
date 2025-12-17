import { ClubEntity } from '@/club/club.entity';
import { SaisonEntity } from '@/saison/saison.entity';
import { TagEntity } from '@/tag/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const TypeMaillot = {
  HOME: 'home',
  AWAY: 'away',
  THIRD: 'third',
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

  @Column()
  clubId: string;

  @ManyToOne(() => SaisonEntity, (saison) => saison.maillots, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'saisonId' })
  saison?: SaisonEntity;

  @Column()
  saisonId: string;

  @Column({
    type: 'enum',
    enum: TypeMaillot,
    default: TypeMaillot.HOME,
  })
  type_maillot: TypeMaillot;

  @Column()
  image_url: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  marque: string;

  @Column({ type: 'jsonb', nullable: true })
  palette_couleur?: string[];

  @ManyToMany(() => TagEntity, (tag) => tag.maillots, {
    cascade: true,
  })
  @JoinTable({
    name: 'maillot_tags',
    joinColumn: { name: 'maillotId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: TagEntity[];
}
