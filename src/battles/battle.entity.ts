import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player1: string;

  @Column()
  player2: string;

  @Column('json')
  cardsPlayer1: { name: string; damage: string }[];

  @Column('json')
  cardsPlayer2: { name: string; damage: string }[];

  @Column({ nullable: true })
  winner: string;
}