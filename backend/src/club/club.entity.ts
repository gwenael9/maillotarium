import { MaillotEntity } from '@/maillot/maillot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('club')
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  country_code: string;

  @OneToMany(() => MaillotEntity, (maillot) => maillot.club)
  maillots: MaillotEntity[];

  @Column({ nullable: true })
  logo_url: string;
}
