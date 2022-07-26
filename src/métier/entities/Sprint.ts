import { Période } from './Période';

export type Sprint = Période &
  Readonly<{
    nom: string;
    id: string;
    statut: string;
  }>;
