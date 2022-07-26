import { Inject } from '@nestjs/common';
import { Déploiement } from '../entities/Déploiement';
import { Métriques } from '../entities/Métriques';
import { Période } from '../entities/Période';
import { Sprint } from '../entities/Sprint';
import { DéploiementsLoader } from '../gateways/DéploiementsLoader';
import { SprintsLoader } from '../gateways/SprintsLoader';

function calculeLeNombreDeDéploiementsSurLaPériode(
  déploiements: Déploiement[],
  période: Période,
) {
  return déploiements.filter(
    (déploiement) =>
      période.dateDeDébut <= déploiement.date &&
      déploiement.date <= période.dateDeFin,
  ).length;
}

export class CalculeLesMétriquesDuSprintActifUseCase {
  constructor(
    @Inject('SprintsLoader')
    private readonly sprintsLoader: SprintsLoader,
    @Inject('DéploiementsLoader')
    private readonly déploiementsLoader: DéploiementsLoader,
  ) {}

  async exécute(): Promise<{ sprintActif: Sprint; métriques: Métriques }> {
    const sprintActif = await this.sprintsLoader.récupèreLeSprintActif();
    const déploiements =
      await this.déploiementsLoader.récupèreTousLesDéploiements();

    const métriques: Métriques = {
      nombreDeDéploiements: calculeLeNombreDeDéploiementsSurLaPériode(
        déploiements,
        sprintActif,
      ),
    };

    return {
      sprintActif,
      métriques,
    };
  }
}
