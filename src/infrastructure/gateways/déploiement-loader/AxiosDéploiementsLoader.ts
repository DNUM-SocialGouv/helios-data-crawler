import { Inject } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Déploiement } from 'src/métier/entities/Déploiement';
import { VariablesDEnvironnement } from 'src/métier/gateways/VariablesDEnvironnement';
import { DéploiementsLoader } from '../../../métier/gateways/DéploiementsLoader';

type DéploiementScalingoRéponse = Readonly<{
  deployments: any[];
  meta: {
    pagination: {
      total_pages: number;
    };
  };
}>;

export class AxiosDéploiementsLoader implements DéploiementsLoader {
  constructor(
    @Inject('VariablesDEnvironnement')
    private readonly variablesDEnvironnement: VariablesDEnvironnement,
  ) {}

  // async récupèreLesDéploiementsSurLaPériode(
  //   début: Date,
  //   fin: Date,
  // ): Promise<Déploiement[]> {
  //   const déploiements = await this.récupèreTousLesDéploiements();

  //   return déploiements.filter(
  //     (déploiement) => début <= déploiement.date && déploiement.date <= fin,
  //   );
  // }

  async récupèreTousLesDéploiements(): Promise<Déploiement[]> {
    const tousLesDéploiements = [];
    let page = 1;
    let nombreDePagesDeDéploiements = 1;

    const token = await this.échangeLeToken();

    while (page <= nombreDePagesDeDéploiements) {
      const réponse = await this.récupèreLesDéploiementsDeLaPage(token, page);
      tousLesDéploiements.push(...réponse.deployments);
      nombreDePagesDeDéploiements = réponse.meta.pagination.total_pages;

      page += 1;
    }

    return tousLesDéploiements.map((déploiement) => ({
      date: new Date(déploiement.created_at),
      gitRef: déploiement.git_ref,
    }));
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
