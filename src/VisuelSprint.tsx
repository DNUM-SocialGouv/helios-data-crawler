import { useEffect, useState } from 'react';
import { Scalingo } from './ClientScalingo';
import { Sprint } from './ListeDesSprints';
import { formateLaDate } from './utils';

type Déploiement = Readonly<{
  date: string;
  gitRef: string;
  durée: string;
}>;

export const VisuelSprint = ({ sprint, retour }: { sprint: Sprint; retour: Function }) => {
  const [déploiements, setDéploiements] = useState<Déploiement[]>([]);

  async function récupèreLesDéploiements() {
    const déploiements = await Scalingo.récupèreLesDéploiements();

    setDéploiements(
      (déploiements.deployments as Array<any>).reduce((déploiementsDuSprint: Déploiement[], deployment: any) => {
        if (
          sprint.dateDeDébut < new Date(deployment.created_at) &&
          new Date(deployment.created_at) < sprint.dateDeFin
        ) {
          déploiementsDuSprint.push({
            date: deployment.created_at,
            gitRef: deployment.git_ref,
            durée: deployment.duration,
          });
        }
        return déploiementsDuSprint;
      }, []),
    );
  }

  useEffect(() => {
    récupèreLesDéploiements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprint]);

  return (
    <main>
      <h2>Voici le visuel du sprint {sprint.id}</h2>
      <button onClick={retour()}>Retour à la liste des sprints</button>
      <p>Nom : {sprint.nom}</p>
      <p>Date de début : {formateLaDate(sprint.dateDeDébut)}</p>
      <p>Date de fin : {formateLaDate(sprint.dateDeFin)}</p>
      <p>Nombre de déploiements : {déploiements.length}</p>
    </main>
  );
};
