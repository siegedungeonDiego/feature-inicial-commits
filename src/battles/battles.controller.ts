import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './battle.entity';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Post('create')
  async createBattle(@Body() createBattleDto: CreateBattleDto): Promise<Battle> {
    return this.battlesService.createBattle(createBattleDto);
  }

  @Post('save')
  async saveBattle(@Body() battle: Battle): Promise<Battle> {
    return this.battlesService.saveBattle(battle);
  }

  @Put(':id')
  async editBattle(@Param('id') id: number, @Body('winner') winner: string): Promise<Battle> {
    return this.battlesService.updateBattle(id, winner);
  }
}