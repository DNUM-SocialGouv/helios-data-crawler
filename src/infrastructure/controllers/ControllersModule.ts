import { Module } from '@nestjs/common';
import { UseCasesModules } from 'src/métier/use-case/UseCasesModule';
import { HomeEndpoint } from './HomeEndpoint';

@Module({
  imports: [UseCasesModules],
  controllers: [HomeEndpoint],
})
export class ControllersModule {}
