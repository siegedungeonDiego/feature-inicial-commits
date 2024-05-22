import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonsModule } from '../pokemons/pokemons.module';
import { BattlesService } from './battles.service';
import { BattlesController } from './battles.controller';
import { Battle } from './battle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battle]), PokemonsModule],
  providers: [BattlesService],
  controllers: [BattlesController],
})
export class BattlesModule {}