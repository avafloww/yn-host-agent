import { Test, TestingModule } from '@nestjs/testing';
import { DisksController } from './disks.controller';
import { DisksService } from './disks.service';

describe('DisksController', () => {
  let controller: DisksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisksController],
      providers: [DisksService],
    }).compile();

    controller = module.get<DisksController>(DisksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
