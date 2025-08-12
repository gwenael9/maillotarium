import { MaillotEntity } from '@/maillot/maillot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum LigueType {
  france = 'Ligue 1',
  angleterre = 'Premier League',
  espagne = 'Liga',
  allemagne = 'Bundesliga',
  italie = 'Serie A',
}

@Entity('club')
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column({ nullable: true })
  pays: string;

  @Column({ nullable: true })
  ligue: LigueType;

  @OneToMany(() => MaillotEntity, (maillot) => maillot.club)
  maillots: MaillotEntity[];

  @Column({ nullable: true })
  logo_url: string;
}
