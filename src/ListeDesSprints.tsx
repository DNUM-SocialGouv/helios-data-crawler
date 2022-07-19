import { useEffect, useState } from 'react';
import { Jira } from './ClientJira';
import { formateLaDate } from './utils';

export type Sprint = Readonly<{
  nom: string;
  dateDeDébut: Date;
  dateDeFin: Date;
  id: number;
}>;

export const ListeDesSprints = ({ sélectionneLeSprint }: { sélectionneLeSprint: Function }) => {
  const [sprints, setSprints] = useState<Sprint[]>([]);

  async function récupèreLesSprints() {
    const sprintsDuTableauJira = await Jira.récupèreLesSprintsDuTableau();
    setSprints(
      sprintsDuTableauJira.values.map((sprint: any): Sprint => {
        return {
          nom: sprint.name,
          dateDeDébut: new Date(sprint.startDate),
          dateDeFin: new Date(sprint.endDate),
          id: sprint.id,
        };
      }),
    );
  }

  useEffect(() => {
    récupèreLesSprints();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Lien</th>
        </tr>
      </thead>
      <tbody>
        {sprints.map((sprint) => (
          <tr key={sprint.id}>
            <td>{sprint.nom}</td>
            <td>{formateLaDate(sprint.dateDeDébut)}</td>
            <td>{formateLaDate(sprint.dateDeFin)}</td>
            <td>
              <button onClick={sélectionneLeSprint(sprint)}>voir le sprint {sprint.id}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
