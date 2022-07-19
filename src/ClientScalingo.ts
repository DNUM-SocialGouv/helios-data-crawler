export namespace Scalingo {
  export async function récupèreLesDéploiements() {
    try {
      const response = await fetch(`/scalingo-deployments.json`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des déploiements de Scalingo');
      console.error(error);
    }
  }
}
