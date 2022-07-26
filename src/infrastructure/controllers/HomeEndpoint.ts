import { Controller, Get, Render } from '@nestjs/common';
import { Métriques } from 'src/métier/entities/Métriques';
import { CalculeLesMétriquesDuSprintActifUseCase } from 'src/métier/use-case/CalculeLesMétriquesDuSprintActifUseCase';
import { RécupèreLesSprintsUseCase } from 'src/métier/use-case/RécupèreLesSprintsUseCase';
import {
  construisLesSprintViewModel,
  SprintViewModel,
} from './SprintViewModel';

@Controller()
export class HomeEndpoint {
  constructor(
    private readonly récupèreLesSprints: RécupèreLesSprintsUseCase,
    private readonly calculeLesMétriquesDuSprintActif: CalculeLesMétriquesDuSprintActifUseCase,
  ) {}

  @Get()
  @Render('index')
  async home(): Promise<{
    sprintActif: SprintViewModel;
    métriques: Métriques;
    sprints: SprintViewModel[];
  }> {
    const { sprintActif, métriques } =
      await this.calculeLesMétriquesDuSprintActif.exécute();

    const sprints = await this.récupèreLesSprints.exécute();

    return {
      sprintActif: construisLesSprintViewModel([sprintActif]).pop(),
      métriques,
      sprints: construisLesSprintViewModel(sprints),
    };
  }
}
