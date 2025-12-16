import { MaillotEntity } from '@/maillot/maillot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('club')
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column({ nullable: true })
  pays: string;

  @OneToMany(() => MaillotEntity, (maillot) => maillot.club)
  maillots: MaillotEntity[];

  @Column({ nullable: true })
  logo_url: string;
}
