import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('club')
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column({ nullable: true })
  pays: string;

  @Column({ nullable: true })
  ligue: string;
}
