import { Module } from '@nestjs/common';
import { GatewaysModule } from 'src/infrastructure/gateways/GatewaysModule';
import { RécupèreLesDéploiementsUseCase } from './RécupèreLesDéploiementsUseCase';

@Module({
  imports: [GatewaysModule],
  providers: [RécupèreLesDéploiementsUseCase],
  exports: [RécupèreLesDéploiementsUseCase],
})
export class UseCasesModules {}
