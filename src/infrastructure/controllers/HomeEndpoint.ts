import { Controller, Get, Render } from '@nestjs/common';
import { Déploiement } from 'src/métier/entities/Déploiement';
import { RécupèreLesDéploiementsUseCase } from '../../métier/use-case/RécupèreLesDéploiementsUseCase';

@Controller()
export class HomeEndpoint {
  constructor(
    private readonly récupèreLesDéploiements: RécupèreLesDéploiementsUseCase,
  ) {}

  @Get()
  @Render('index')
  async getHello(): Promise<{ déploiements: Déploiement[] }> {
    const déploiements = await this.récupèreLesDéploiements.exécute();
    // console.log(déploiements);

    return { déploiements };
  }
}
