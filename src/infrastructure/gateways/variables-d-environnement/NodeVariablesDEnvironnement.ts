import { Injectable } from '@nestjs/common';
import { VariablesDEnvironnement } from 'src/métier/gateways/VariablesDEnvironnement';

@Injectable()
export class NodeVariablesDEnvironnement implements VariablesDEnvironnement {
  readonly SERVER_PORT: number = Number(
    this.lisOuSignaleSiNonRenseignée('SERVER_PORT'),
  );
  readonly SCALINGO_TOKEN: string =
    this.lisOuSignaleSiNonRenseignée('SCALINGO_TOKEN');
  readonly JIRA_HOST: string = this.lisOuSignaleSiNonRenseignée('JIRA_HOST');
  readonly JIRA_BOARD_ID: string =
    this.lisOuSignaleSiNonRenseignée('JIRA_BOARD_ID');
  readonly JIRA_USERNAME: string =
    this.lisOuSignaleSiNonRenseignée('JIRA_USERNAME');
  readonly JIRA_PASSWORD: string =
    this.lisOuSignaleSiNonRenseignée('JIRA_PASSWORD');

  private lisOuSignaleSiNonRenseignée(clé: string): string {
    if (!process.env[clé]) {
      console.error(
        `----- WARNING ----- La variable d’environnement "${clé}" est manquante.`,
      );

      return '';
    }

    return process.env[clé]!;
  }
}
