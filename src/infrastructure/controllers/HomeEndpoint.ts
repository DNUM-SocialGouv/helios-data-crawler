import { Controller, Get, Render } from '@nestjs/common';
import { RécupèreLesSprintsUseCase } from 'src/métier/use-case/RécupèreLesSprintsUseCase';
import {
  construisLesSprintViewModel,
  SprintViewModel,
} from './SprintViewModel';

@Controller()
export class HomeEndpoint {
  constructor(private readonly récupèreLesSprints: RécupèreLesSprintsUseCase) {}

  @Get()
  @Render('index')
  async home(): Promise<{ sprints: SprintViewModel[] }> {
    const sprints = await this.récupèreLesSprints.exécute();

    return { sprints: construisLesSprintViewModel(sprints) };
  }
}
