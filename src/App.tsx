import { useState } from 'react';
import { ListeDesSprints, Sprint } from './ListeDesSprints';
import { TitreDeLApplication } from './TitreDeLApplication';
import { VisuelSprint } from './VisuelSprint';

enum Écran {
  LISTE_DES_SPRINTS,
  SPRINT_PARTICULIER,
}

function App() {
  const [écran, setÉcran] = useState<Écran>(Écran.LISTE_DES_SPRINTS);
  const [sprintSélectionné, setSprintSélectionné] = useState<Sprint>();

  function sélectionneLeSprint(sprint: Sprint) {
    return () => {
      setSprintSélectionné(sprint);
      setÉcran(Écran.SPRINT_PARTICULIER);
    };
  }

  function retourAccueil() {
    return () => {
      setÉcran(Écran.LISTE_DES_SPRINTS);
    };
  }

  return (
    <>
      <TitreDeLApplication />
      {écran === Écran.LISTE_DES_SPRINTS && <ListeDesSprints sélectionneLeSprint={sélectionneLeSprint} />}
      {écran === Écran.SPRINT_PARTICULIER && sprintSélectionné && (
        <VisuelSprint sprint={sprintSélectionné} retour={retourAccueil} />
      )}
    </>
  );
}

export default App;
