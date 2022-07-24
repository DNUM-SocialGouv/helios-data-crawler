import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/ControllersModule';
import { GatewaysModule } from './infrastructure/gateways/GatewaysModule';
import { UseCasesModules } from './métier/use-case/UseCasesModule';

@Module({
  imports: [UseCasesModules, ControllersModule, GatewaysModule],
})
export class AppModule {}
