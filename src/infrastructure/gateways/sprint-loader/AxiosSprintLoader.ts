import { Inject } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Sprint } from 'src/métier/entities/Sprint';
import { SprintsLoader } from 'src/métier/gateways/SprintsLoader';
import { VariablesDEnvironnement } from 'src/métier/gateways/VariablesDEnvironnement';

type SprintJira = Readonly<{
  id: string;
  state: string;
  name: string;
  startDate: string;
  endDate: string;
}>;

type BoardSprintsJira = Readonly<{
  values: SprintJira[];
}>;

export class AxiosSprintLoader implements SprintsLoader {
  constructor(
    @Inject('VariablesDEnvironnement')
    private readonly variablesDEnvironnement: VariablesDEnvironnement,
  ) {}

  async récupèreLeSprintActif(): Promise<Sprint> {
    const sprints = await this.récupèreTousLesSprints();

    return sprints.filter((sprint) => sprint.statut === 'active')[0];
  }

  async récupèreTousLesSprints(): Promise<Sprint[]> {
    const donnéesDesSprints = await this.requêteTousLesSprints();

    const sprints = this.construisLesSprints(donnéesDesSprints);
    return sprints.sort(
      (a, b) => b.dateDeFin.getTime() - a.dateDeFin.getTime(),
    );
  }

  private construisLesSprints(donnéesDesSprints: BoardSprintsJira): Sprint[] {
    return donnéesDesSprints.values.map((sprint: SprintJira) => ({
      dateDeDébut: new Date(sprint.startDate),
      dateDeFin: new Date(sprint.endDate),
      nom: sprint.name,
      id: sprint.id,
      statut: sprint.state,
    }));
  }

  private async requêteTousLesSprints(): Promise<any> {
    const config: AxiosRequestConfig = {
      auth: {
        username: this.variablesDEnvironnement.JIRA_USERNAME,
        password: this.variablesDEnvironnement.JIRA_PASSWORD,
      },
    };

    try {
      return (
        await axios.get<BoardSprintsJira>(
          `${this.variablesDEnvironnement.JIRA_HOST}/rest/agile/1.0/board/${this.variablesDEnvironnement.JIRA_BOARD_ID}/sprint`,
          config,
        )
      ).data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
