import { Déploiement } from '../entities/Déploiement';

export interface DéploiementsLoader {
  récupèreTousLesDéploiements(): Promise<Déploiement[]>;
}
