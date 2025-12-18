import { MaillotEntity } from '@/maillot/maillot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('saison')
export class SaisonEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  anneeDebut: number;

  @Column()
  anneeFin: number;

  @OneToMany(() => MaillotEntity, (maillot) => maillot.saison)
  maillots: MaillotEntity[];
}
