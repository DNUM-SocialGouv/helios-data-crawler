import { Module } from '@nestjs/common';
import { GatewaysModule } from 'src/infrastructure/gateways/GatewaysModule';
import { CalculeLesMétriquesDuSprintActifUseCase } from './CalculeLesMétriquesDuSprintActifUseCase';
import { RécupèreLesDéploiementsUseCase } from './RécupèreLesDéploiementsUseCase';
import { RécupèreLesSprintsUseCase } from './RécupèreLesSprintsUseCase';

@Module({
  imports: [GatewaysModule],
  providers: [
    CalculeLesMétriquesDuSprintActifUseCase,
    RécupèreLesDéploiementsUseCase,
    RécupèreLesSprintsUseCase,
  ],
  exports: [
    CalculeLesMétriquesDuSprintActifUseCase,
    RécupèreLesDéploiementsUseCase,
    RécupèreLesSprintsUseCase,
  ],
})
export class UseCasesModules {}
