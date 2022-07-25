import { Sprint } from '../../métier/entities/Sprint';

export type SprintViewModel = Readonly<{
  id: string;
  nom: string;
  dateDeDébut: string;
  dateDeFin: string;
  statut: string;
}>;

function formateLaDate(date: Date): string {
  return `${('0' + date.getDate()).slice(-2)} / ${('0' + date.getMonth()).slice(
    -2,
  )} / ${date.getFullYear()}`;
}

export function construisLesSprintViewModel(
  sprints: Sprint[],
): SprintViewModel[] {
  return sprints.map(
    (sprint: Sprint): SprintViewModel => ({
      id: sprint.id,
      nom: sprint.nom,
      dateDeDébut: formateLaDate(sprint.dateDeDébut),
      dateDeFin: formateLaDate(sprint.dateDeFin),
      statut: sprint.statut,
    }),
  );
}
