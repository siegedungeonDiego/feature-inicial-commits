import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Module({
  providers: [PokemonsService],
  exports: [PokemonsService],
})
export class PokemonsModule {}