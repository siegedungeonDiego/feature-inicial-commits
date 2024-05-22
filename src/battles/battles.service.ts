import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './battle.entity';
import { PokemonsService } from '../pokemons/pokemons.service';
import { CreateBattleDto } from './dto/create-battle.dto';

@Injectable()
export class BattlesService {
  constructor(
    @InjectRepository(Battle)
    private battleRepository: Repository<Battle>,
    private pokemonsService: PokemonsService,
  ) {}

  async createBattle(createBattleDto: CreateBattleDto): Promise<Battle> {
    const { player1, player2 } = createBattleDto;
    const cardsPlayer1 = await this.pokemonsService.getMultiplePokemonCards();
    const cardsPlayer2 = await this.pokemonsService.getMultiplePokemonCards();

    const newBattle = this.battleRepository.create({
      player1,
      player2,
      cardsPlayer1,
      cardsPlayer2,
    });

    return newBattle;
  }

  async saveBattle(battle: Battle): Promise<Battle> {
    return this.battleRepository.save(battle);
  }

  async updateBattle(id: number, winner: string): Promise<Battle> {
    const battle = await this.battleRepository.findOne({ where: { id } });

    if (!battle) {
      throw new Error('Battle not found');
    }

    battle.winner = winner;

    return this.battleRepository.save(battle);
  }
}