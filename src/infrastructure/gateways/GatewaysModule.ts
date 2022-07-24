import { Module } from '@nestjs/common';
import { AxiosDéploiementsLoader } from './déploiement-loader/AxiosDéploiementsLoader';
import { NodeVariablesDEnvironnement } from './variables-d-environnement/NodeVariablesDEnvironnement';

@Module({
  providers: [
    {
      provide: 'DéploiementsLoader',
      useClass: AxiosDéploiementsLoader,
    },
    {
      provide: 'VariablesDEnvironnement',
      useClass: NodeVariablesDEnvironnement,
    },
  ],
  exports: ['DéploiementsLoader', 'VariablesDEnvironnement'],
})
export class GatewaysModule {}
