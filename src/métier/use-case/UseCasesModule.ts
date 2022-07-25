import { Module } from '@nestjs/common';
import { GatewaysModule } from 'src/infrastructure/gateways/GatewaysModule';
import { RécupèreLesDéploiementsUseCase } from './RécupèreLesDéploiementsUseCase';
import { RécupèreLesSprintsUseCase } from './RécupèreLesSprintsUseCase';

@Module({
  imports: [GatewaysModule],
  providers: [RécupèreLesDéploiementsUseCase, RécupèreLesSprintsUseCase],
  exports: [RécupèreLesDéploiementsUseCase, RécupèreLesSprintsUseCase],
})
export class UseCasesModules {}
