import { Sprint } from '../entities/Sprint';

export interface SprintsLoader {
  récupèreTousLesSprints(): Promise<Sprint[]>;
}
