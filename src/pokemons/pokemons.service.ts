import { Injectable } from '@nestjs/common';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

@Injectable()
export class PokemonsService {
  constructor() {
    const apiKey = process.env.POKEMONTCG_API_KEY;

    if (!apiKey) {
      throw new Error("API Key is missing");
    }
  }

  async getMultiplePokemonCards(): Promise<{ name: string; damage: string }[]> {
    const response = await PokemonTCG.findCardsByQueries({page:1, pageSize: 30 });
    const index = getRandomNumber();
    return response.map(card => {
      const damageInfo = card.attacks ? card.attacks.map(attack => attack.damage).join(', ') : 'No damage';
      return {
        name: card.name,
        damage: damageInfo,
      };
    }).slice(index, index + 5);
  }
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10) + 1;
}