import { Inject, Injectable } from '@nestjs/common';
import { Déploiement } from '../entities/Déploiement';
import { DéploiementsLoader } from '../gateways/DéploiementsLoader';

@Injectable()
export class RécupèreLesDéploiementsUseCase {
  constructor(
    @Inject('DéploiementsLoader')
    private readonly déploiementsLoader: DéploiementsLoader,
  ) {}

  async exécute(): Promise<Déploiement[]> {
    return await this.déploiementsLoader.récupèreTousLesDéploiements();
  }
}
