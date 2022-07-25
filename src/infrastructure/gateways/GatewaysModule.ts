import { Module } from '@nestjs/common';
import { AxiosDéploiementsLoader } from './déploiement-loader/AxiosDéploiementsLoader';
import { AxiosSprintLoader } from './sprint-loader/AxiosSprintLoader';
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
    {
      provide: 'SprintsLoader',
      useClass: AxiosSprintLoader,
    },
  ],
  exports: ['DéploiementsLoader', 'VariablesDEnvironnement', 'SprintsLoader'],
})
export class GatewaysModule {}
