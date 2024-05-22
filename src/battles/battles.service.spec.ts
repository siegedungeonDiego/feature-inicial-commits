import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BattlesService } from './battles.service';
import { Battle } from './battle.entity';
import { PokemonsService } from '../pokemons/pokemons.service';
import { CreateBattleDto } from './dto/create-battle.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

const mockPokemonsService = {
  getMultiplePokemonCards: jest.fn(),
};

describe('BattlesService', () => {
  let battlesService: BattlesService;
  let battlesRepository: MockRepository<Battle>;
  let pokemonsService: PokemonsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BattlesService,
        {
          provide: getRepositoryToken(Battle),
          useValue: createMockRepository(),
        },
        {
          provide: PokemonsService,
          useValue: mockPokemonsService,
        },
      ],
    }).compile();

    battlesService = moduleRef.get<BattlesService>(BattlesService);
    battlesRepository = moduleRef.get<MockRepository<Battle>>(getRepositoryToken(Battle));
    pokemonsService = moduleRef.get<PokemonsService>(PokemonsService);
  });

  describe('createBattle', () => {
    it('should create a new battle', async () => {
      const createBattleDto: CreateBattleDto = {
        player1: 'Ash',
        player2: 'Misty',
      };

      const newBattle: Battle = {
        id: 1,
        player1: 'Ash',
        player2: 'Misty',
        cardsPlayer1: [{ name: 'Pikachu', damage: '20' }],
        cardsPlayer2: [{ name: 'Psyduck', damage: '15' }],
        winner: null,
      };

      battlesRepository.create.mockReturnValue(newBattle);
      mockPokemonsService.getMultiplePokemonCards.mockResolvedValueOnce(newBattle.cardsPlayer1);
      mockPokemonsService.getMultiplePokemonCards.mockResolvedValueOnce(newBattle.cardsPlayer2);

      expect(await battlesService.createBattle(createBattleDto)).toEqual(newBattle);
      expect(mockPokemonsService.getMultiplePokemonCards).toHaveBeenCalledTimes(2);
    });
  });

  describe('saveBattle', () => {
    it('should save a battle', async () => {
      const battle: Battle = {
        id: 1,
        player1: 'Ash',
        player2: 'Misty',
        cardsPlayer1: [{ name: 'Pikachu', damage: '20' }],
        cardsPlayer2: [{ name: 'Psyduck', damage: '15' }],
        winner: 'Ash',
      };

      battlesRepository.save.mockResolvedValue(battle);

      expect(await battlesService.saveBattle(battle)).toEqual(battle);
    });
  });

  describe('updateBattle', () => {
    it('should update the winner of the battle', async () => {
      const id = 1;
      const winner = 'Misty';
      const battle: Battle = {
        id,
        player1: 'Ash',
        player2: 'Misty',
        cardsPlayer1: [{ name: 'Pikachu', damage: '20' }],
        cardsPlayer2: [{ name: 'Psyduck', damage: '15' }],
        winner: null,
      };

      const updatedBattle = { ...battle, winner };

      battlesRepository.findOne.mockResolvedValue(battle);
      battlesRepository.save.mockResolvedValue(updatedBattle);

      expect(await battlesService.updateBattle(id, winner)).toEqual(updatedBattle);
    });
  });
});