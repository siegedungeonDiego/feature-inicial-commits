import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Battle } from './battles/battle.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [Battle],
  synchronize: true,
};