import { MaillotEntity } from '@/maillot/maillot.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => MaillotEntity, (maillot) => maillot.tags)
  maillots: MaillotEntity[];
}
