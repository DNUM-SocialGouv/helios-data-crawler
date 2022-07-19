export namespace Jira {
  const HOST = 'https://jira.sg.social.gouv.fr';
  export const ID_TABLEAU_DÉVELOPPEMENT = '263';

  export async function récupèreLesSprintsDuTableau() {
    try {
      const response = await fetch(`/jira-sprints.json`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur durant la récupération des sprints de JIRA`);
      console.error(error);
    }
  }

  export async function récupèreLeSprint(sprintId: string) {
    try {
      return await (await fetch(`${HOST}/rest/agile/1.0/sprint/${sprintId}`)).json();
    } catch (error) {
      console.error(`Erreur durant la récupération du sprint ${sprintId}`);
    }
  }

  export async function récupèreLesStoriesDuSprint(tableauId: string, sprintId: string) {
    try {
      return await (await fetch(`${HOST}/rest/agile/1.0/board/${tableauId}/sprint/${sprintId}/issue`)).json();
    } catch (error) {
      console.error(`Erreur durant la récupération du sprint ${sprintId} et de ses stories`);
    }
  }
}
