import { Inject, Injectable } from '@nestjs/common';
import { SprintsLoader } from '../gateways/SprintsLoader';
import { Sprint } from '../entities/Sprint';

@Injectable()
export class RécupèreLesSprintsUseCase {
  constructor(
    @Inject('SprintsLoader')
    private readonly sprintsLoader: SprintsLoader,
  ) {}

  async exécute(): Promise<Sprint[]> {
    return await this.sprintsLoader.récupèreTousLesSprints();
  }
}
