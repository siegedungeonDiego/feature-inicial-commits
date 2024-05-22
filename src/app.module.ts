import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { BattlesModule } from './battles/battles.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BattlesModule],
})
export class AppModule {}