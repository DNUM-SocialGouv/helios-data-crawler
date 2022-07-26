import { Inject } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Déploiement } from 'src/métier/entities/Déploiement';
import { VariablesDEnvironnement } from 'src/métier/gateways/VariablesDEnvironnement';
import { DéploiementsLoader } from '../../../métier/gateways/DéploiementsLoader';

type DéploiementScalingoRéponse = Readonly<{
  deployments: {
    created_at: string;
    status: string;
    git_ref: string;
  }[];
  meta: {
    pagination: {
      total_pages: number;
    };
  };
}>;

export class AxiosDéploiementsLoader implements DéploiementsLoader {
  readonly DÉPLOIEMENT_RÉUSSI = 'success';

  constructor(
    @Inject('VariablesDEnvironnement')
    private readonly variablesDEnvironnement: VariablesDEnvironnement,
  ) {}

  async récupèreTousLesDéploiements(): Promise<Déploiement[]> {
    const tousLesDéploiements: DéploiementScalingoRéponse['deployments'] = [];
    let page = 1;
    let nombreDePagesDeDéploiements = 1;

    const token = await this.échangeLeToken();

    while (page <= nombreDePagesDeDéploiements) {
      const réponse = await this.récupèreLesDéploiementsDeLaPage(token, page);
      tousLesDéploiements.push(...réponse.deployments);
      nombreDePagesDeDéploiements = réponse.meta.pagination.total_pages;

      page += 1;
    }

    return tousLesDéploiements.reduce(
      (déploiementsAvecSuccès: Déploiement[], déploiement) => {
        if (déploiement.status === this.DÉPLOIEMENT_RÉUSSI) {
          déploiementsAvecSuccès.push({
            date: new Date(déploiement.created_at),
            gitRef: déploiement.git_ref,
          });
        }
        return déploiementsAvecSuccès;
      },
      [],
    );
  }

  private async récupèreLesDéploiementsDeLaPage(
    token: string,
    page: number,
  ): Promise<DéploiementScalingoRéponse> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      return (
        await axios.get<DéploiementScalingoRéponse>(
          `https://api.osc-fr1.scalingo.com/v1/apps/helios/deployments?page=${page}`,
          config,
        )
      ).data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async échangeLeToken() {
    const config: AxiosRequestConfig = {
      auth: {
        username: '',
        password: this.variablesDEnvironnement.SCALINGO_TOKEN,
      },
    };
    const réponse = await axios.post<{ token: string }>(
      'https://auth.scalingo.com/v1/tokens/exchange',
      undefined,
      config,
    );

    return réponse.data.token;
  }
}
