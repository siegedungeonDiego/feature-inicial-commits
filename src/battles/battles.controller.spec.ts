import { Test, TestingModule } from '@nestjs/testing';
import { BattlesController } from './battles.controller';
import { BattlesService } from './battles.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './battle.entity';

describe('BattlesController', () => {
  let battlesController: BattlesController;
  let battlesService: BattlesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BattlesController],
      providers: [
        {
          provide: BattlesService,
          useValue: {
            createBattle: jest.fn(),
            saveBattle: jest.fn(),
            updateBattle: jest.fn(),
          },
        },
      ],
    }).compile();

    battlesController = moduleRef.get<BattlesController>(BattlesController);
    battlesService = moduleRef.get<BattlesService>(BattlesService);
  });

  describe('createBattle', () => {
    it('should return a new battle object', async () => {
      const createBattleDto: CreateBattleDto = {
        player1: 'Ash',
        player2: 'Misty',
      };

      const result: Battle = {
        id: 1,
        player1: 'Ash',
        player2: 'Misty',
        cardsPlayer1: [{ name: 'Pikachu', damage: '20' }],
        cardsPlayer2: [{ name: 'Psyduck', damage: '15' }],
        winner: null,
      };

      jest.spyOn(battlesService, 'createBattle').mockResolvedValue(result);

      expect(await battlesController.createBattle(createBattleDto)).toEqual(result);
    });
  });

  describe('saveBattle', () => {
    it('should save the battle object', async () => {
      const battle: Battle = {
        id: 1,
        player1: 'Ash',
        player2: 'Misty',
        cardsPlayer1: [{ name: 'Pikachu', damage: '20' }],
        cardsPlayer2: [{ name: 'Psyduck', damage: '15' }],
        winner: 'Ash',
      };

      jest.spyOn(battlesService, 'saveBattle').mockResolvedValue(battle);

      expect(await battlesController.saveBattle(battle)).toEqual(battle);
    });
  });

  describe('editBattle', () => {
    it('should update the winner of the battle', async () => {
      const id = 1;
      const winner = 'Misty';
      const updatedBattle: Battle = {
        id,
        player1: 'Ash',
        player2: 'Misty',
        cardsPlayer1: [{ name: 'Pikachu', damage: '20' }],
        cardsPlayer2: [{ name: 'Psyduck', damage: '15' }],
        winner,
      };

      jest.spyOn(battlesService, 'updateBattle').mockResolvedValue(updatedBattle);

      expect(await battlesController.editBattle(id, winner)).toEqual(updatedBattle);
    });
  });
});