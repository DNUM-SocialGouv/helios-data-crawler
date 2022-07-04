import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListeDesIssues } from './ListeDesIssues';
import { Sprint } from './ListeDesSprints';
import { formateLaDate } from './utils';

export type Story = Readonly<{
  titre: string;
  label: string;
  état: string;
  type: string;
  epic: string;
}>;

export const VisuelSprint = () => {
  const { sprintId } = useParams();

  const [sprint, setSprint] = useState<Sprint>({
    id: 443,
    nom: 'Helios Sprint 1',
    dateDeDébut: '11 / 04 / 2022',
    dateDeFin: '25 / 04 / 2022',
  });

  const [stories, setStories] = useState<Story[]>([]);

  async function récupèreLeSprintEtLesStories(sprintId: string | undefined) {
    try {
      // return await (await fetch(`https://jira.sg.social.gouv.fr/rest/agile/1.0/sprint/{sprintId}`)).json();
      const donnéesDuSprintJira = {
        id: 443,
        self: 'https://jira.sg.social.gouv.fr/rest/agile/1.0/sprint/443',
        state: 'closed',
        name: 'Helios Sprint 1',
        startDate: '2022-04-11T12:51:35.290+02:00',
        endDate: '2022-04-25T12:51:00.000+02:00',
        completeDate: '2022-04-28T12:51:46.946+02:00',
        originBoardId: 263,
        goal: '',
      };
      setSprint({
        nom: donnéesDuSprintJira.name,
        dateDeDébut: formateLaDate(new Date(donnéesDuSprintJira.startDate)),
        dateDeFin: formateLaDate(new Date(donnéesDuSprintJira.endDate)),
        id: donnéesDuSprintJira.id,
      });

      // return await (await fetch(`https://jira.sg.social.gouv.fr/rest/agile/1.0/board/263/sprint/{sprintId}/issue`)).json();
      const donnéesDesIssues = {
        expand: 'names,schema',
        startAt: 0,
        maxResults: 50,
        total: 1,
        issues: [
          {
            expand: 'operations,versionedRepresentations,editmeta,changelog,renderedFields',
            id: '35275',
            self: 'https://jira.sg.social.gouv.fr/rest/agile/1.0/issue/35275',
            key: 'HEL-15',
            fields: {
              fixVersions: [],
              customfield_11200: null,
              resolution: null,
              customfield_11201: null,
              customfield_11202: null,
              customfield_11203: null,
              customfield_10105: '0|i03log:',
              customfield_10106: null,
              customfield_10900: null,
              customfield_10505: null,
              customfield_10901: null,
              customfield_10902: null,
              customfield_10507: null,
              customfield_10903: null,
              customfield_10904: null,
              customfield_10906: null,
              customfield_10908: null,
              customfield_10909: null,
              lastViewed: null,
              epic: {
                id: 35152,
                key: 'HEL-4',
                self: 'https://jira.sg.social.gouv.fr/rest/agile/1.0/epic/35152',
                name: 'Intégration FINESS',
                summary: 'Intégration FINESS de bout en bout',
                color: {
                  key: 'color_12',
                },
                done: false,
              },
              priority: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/priority/10001',
                iconUrl: 'https://jira.sg.social.gouv.fr/images/icons/priorities/medium.svg',
                name: 'Standard',
                id: '10001',
              },
              customfield_10100: [
                'com.atlassian.greenhopper.service.sprint.Sprint@2af03ca8[id=443,rapidViewId=263,state=CLOSED,name=Helios Sprint 1,startDate=2022-04-11T12:51:35.290+02:00,endDate=2022-04-25T12:51:00.000+02:00,completeDate=2022-04-28T12:51:46.946+02:00,sequence=443,goal=]',
                'com.atlassian.greenhopper.service.sprint.Sprint@37887cb2[id=445,rapidViewId=263,state=CLOSED,name=Helios Sprint 2,startDate=2022-04-25T15:37:28.492+02:00,endDate=2022-05-09T15:37:00.000+02:00,completeDate=2022-05-06T14:28:39.968+02:00,sequence=445,goal=]',
                'com.atlassian.greenhopper.service.sprint.Sprint@2c98edc9[id=446,rapidViewId=263,state=CLOSED,name=Helios Sprint 3,startDate=2022-05-06T14:29:18.398+02:00,endDate=2022-05-20T14:29:00.000+02:00,completeDate=2022-05-20T14:57:08.997+02:00,sequence=446,goal=]',
              ],
              customfield_10101: 'HEL-4',
              labels: [],
              customfield_10611: null,
              customfield_10612: null,
              customfield_10613: null,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              issuelinks: [],
              assignee: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/user?username=fabien.mercier',
                name: 'fabien.mercier',
                key: 'JIRAUSER16586',
                emailAddress: 'fabien.mercier@octo.com',
                avatarUrls: {
                  '48x48': 'https://jira.sg.social.gouv.fr/secure/useravatar?ownerId=JIRAUSER16586&avatarId=12025',
                  '24x24':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=small&ownerId=JIRAUSER16586&avatarId=12025',
                  '16x16':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=xsmall&ownerId=JIRAUSER16586&avatarId=12025',
                  '32x32':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=medium&ownerId=JIRAUSER16586&avatarId=12025',
                },
                displayName: 'Fabien Mercier',
                active: true,
                timeZone: 'Europe/Paris',
              },
              status: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/status/10706',
                description: 'A la fin du sprint toutes les US démontrables sont livrés sur l’intégration',
                iconUrl: 'https://jira.sg.social.gouv.fr/images/icons/statuses/generic.png',
                name: 'Livré',
                id: '10706',
                statusCategory: {
                  self: 'https://jira.sg.social.gouv.fr/rest/api/2/statuscategory/4',
                  id: 4,
                  key: 'indeterminate',
                  colorName: 'yellow',
                  name: 'En cours',
                },
              },
              components: [],
              customfield_11300: null,
              customfield_11301: null,
              customfield_10600: null,
              customfield_10601: null,
              customfield_10602: null,
              customfield_10603: [
                {
                  self: 'https://jira.sg.social.gouv.fr/rest/api/2/customFieldOption/11200',
                  value: 'Production',
                  id: '11200',
                },
              ],
              aggregatetimeestimate: null,
              customfield_10604: null,
              customfield_10605: null,
              customfield_10606: null,
              customfield_10607: null,
              customfield_10608: null,
              customfield_10609: null,
              creator: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/user?username=chloe.lemarie',
                name: 'chloe.lemarie',
                key: 'JIRAUSER16583',
                emailAddress: 'chloe.lemarie@octo.com',
                avatarUrls: {
                  '48x48': 'https://jira.sg.social.gouv.fr/secure/useravatar?ownerId=JIRAUSER16583&avatarId=12116',
                  '24x24':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=small&ownerId=JIRAUSER16583&avatarId=12116',
                  '16x16':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=xsmall&ownerId=JIRAUSER16583&avatarId=12116',
                  '32x32':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=medium&ownerId=JIRAUSER16583&avatarId=12116',
                },
                displayName: 'Chloe Lemarie',
                active: true,
                timeZone: 'Europe/Paris',
              },
              subtasks: [],
              reporter: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/user?username=chloe.lemarie',
                name: 'chloe.lemarie',
                key: 'JIRAUSER16583',
                emailAddress: 'chloe.lemarie@octo.com',
                avatarUrls: {
                  '48x48': 'https://jira.sg.social.gouv.fr/secure/useravatar?ownerId=JIRAUSER16583&avatarId=12116',
                  '24x24':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=small&ownerId=JIRAUSER16583&avatarId=12116',
                  '16x16':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=xsmall&ownerId=JIRAUSER16583&avatarId=12116',
                  '32x32':
                    'https://jira.sg.social.gouv.fr/secure/useravatar?size=medium&ownerId=JIRAUSER16583&avatarId=12116',
                },
                displayName: 'Chloe Lemarie',
                active: true,
                timeZone: 'Europe/Paris',
              },
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10710: null,
              customfield_10711: null,
              customfield_10712: null,
              customfield_10714: null,
              closedSprints: [
                {
                  id: 443,
                  self: 'https://jira.sg.social.gouv.fr/rest/agile/1.0/sprint/443',
                  state: 'closed',
                  name: 'Helios Sprint 1',
                  startDate: '2022-04-11T12:51:35.290+02:00',
                  endDate: '2022-04-25T12:51:00.000+02:00',
                  completeDate: '2022-04-28T12:51:46.946+02:00',
                  originBoardId: 263,
                  goal: '',
                },
                {
                  id: 445,
                  self: 'https://jira.sg.social.gouv.fr/rest/agile/1.0/sprint/445',
                  state: 'closed',
                  name: 'Helios Sprint 2',
                  startDate: '2022-04-25T15:37:28.492+02:00',
                  endDate: '2022-05-09T15:37:00.000+02:00',
                  completeDate: '2022-05-06T14:28:39.968+02:00',
                  originBoardId: 263,
                  goal: '',
                },
                {
                  id: 446,
                  self: 'https://jira.sg.social.gouv.fr/rest/agile/1.0/sprint/446',
                  state: 'closed',
                  name: 'Helios Sprint 3',
                  startDate: '2022-05-06T14:29:18.398+02:00',
                  endDate: '2022-05-20T14:29:00.000+02:00',
                  completeDate: '2022-05-20T14:57:08.997+02:00',
                  originBoardId: 263,
                  goal: '',
                },
              ],
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/issue/HEL-15/votes',
                votes: 0,
                hasVoted: false,
              },
              worklog: {
                startAt: 0,
                maxResults: 20,
                total: 0,
                worklogs: [],
              },
              issuetype: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/issuetype/10300',
                id: '10300',
                description: 'Tâche qui doit être effectuée.',
                iconUrl:
                  'https://jira.sg.social.gouv.fr/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype',
                name: 'Tâche',
                subtask: false,
                avatarId: 10318,
              },
              timespent: null,
              customfield_11240: null,
              customfield_11241: null,
              project: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/project/11509',
                id: '11509',
                key: 'HEL',
                name: 'Helios',
                projectTypeKey: 'software',
                avatarUrls: {
                  '48x48': 'https://jira.sg.social.gouv.fr/secure/projectavatar?pid=11509&avatarId=12033',
                  '24x24': 'https://jira.sg.social.gouv.fr/secure/projectavatar?size=small&pid=11509&avatarId=12033',
                  '16x16': 'https://jira.sg.social.gouv.fr/secure/projectavatar?size=xsmall&pid=11509&avatarId=12033',
                  '32x32': 'https://jira.sg.social.gouv.fr/secure/projectavatar?size=medium&pid=11509&avatarId=12033',
                },
                projectCategory: {
                  self: 'https://jira.sg.social.gouv.fr/rest/api/2/projectCategory/10100',
                  id: '10100',
                  description: 'Projet Devops',
                  name: 'Devops',
                },
              },
              customfield_11000: null,
              customfield_11242: null,
              customfield_11243: null,
              customfield_11244: null,
              aggregatetimespent: null,
              customfield_11245: null,
              customfield_11246: null,
              customfield_10302: null,
              customfield_11237: null,
              customfield_10303: null,
              customfield_11238: null,
              customfield_10304: null,
              customfield_10700: null,
              customfield_11239: null,
              customfield_10305: null,
              customfield_10701: null,
              customfield_10306: null,
              customfield_10702: null,
              customfield_10307: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/customFieldOption/10301',
                value: 'Non',
                id: '10301',
              },
              customfield_10703: null,
              customfield_10308: null,
              customfield_10704: null,
              resolutiondate: null,
              customfield_10309: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/customFieldOption/10300',
                value: 'Non',
                id: '10300',
              },
              customfield_10705: null,
              customfield_10706: null,
              customfield_10707: null,
              workratio: -1,
              customfield_10708: null,
              customfield_10709: null,
              watches: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/issue/HEL-15/watchers',
                watchCount: 1,
                isWatching: false,
              },
              created: '2022-04-20T10:33:39.000+0200',
              customfield_11230: null,
              customfield_11110: null,
              customfield_11231: null,
              customfield_11232: null,
              customfield_11111: null,
              customfield_10300: null,
              customfield_11235: null,
              customfield_11236: null,
              customfield_11105: null,
              customfield_11226: null,
              customfield_11227: null,
              customfield_11106: null,
              customfield_10810: null,
              customfield_11107: null,
              customfield_11228: null,
              customfield_10811: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/customFieldOption/10917',
                value: 'Oui',
                id: '10917',
              },
              customfield_11229: null,
              customfield_11108: null,
              customfield_11109: null,
              updated: '2022-05-19T15:26:08.000+0200',
              timeoriginalestimate: null,
              description:
                "*En tant que* Développeur Helios,\r\n\r\n*j'aimerai* me connecter au SFTP\r\n\r\n*afin de* pouvoir rappatrier les données et les afficher sur Helios.\r\n\r\n*A faire :* \r\n * Créer un compte Mélanissimo ([https://authentification.din.developpement-durable.gouv.fr/authSAML/connexion.do;jsessionid=67ABF0C6CA94CEC63FC6B15F857209D0.TC80_05_07)] et envoyer le lien Mélanissimo avec le ZIP à Eric Sergent (FINESS)\r\n * Récupérer les zips envoyés par les fournisseurs de données sur Scalingo\r\n * Dézipper et récupérer les fichiers\r\n * Lire les fichiers\r\n\r\n*Tests :* \r\n * Vérifier que la data est dans la base de donnée",
              customfield_11220: null,
              customfield_11100: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/customFieldOption/11301',
                value: 'Non',
                id: '11301',
              },
              customfield_11221: null,
              customfield_11222: null,
              customfield_11101: null,
              customfield_11223: null,
              customfield_11102: null,
              customfield_11224: null,
              timetracking: {},
              customfield_11104: null,
              customfield_11225: null,
              customfield_11215: null,
              customfield_11216: null,
              customfield_11217: null,
              customfield_10800: {
                self: 'https://jira.sg.social.gouv.fr/rest/api/2/customFieldOption/10900',
                value: 'Appli',
                id: '10900',
              },
              customfield_11218: null,
              attachment: [],
              customfield_11219: null,
              flagged: false,
              customfield_10803: null,
              customfield_10804: null,
              customfield_10805: null,
              customfield_10806: null,
              customfield_10807: null,
              customfield_10808: null,
              customfield_10809: null,
              summary: 'Créer une connexion à un SFTP pour pouvoir rapatrier les données ',
              customfield_10000:
                '{summaryBean=com.atlassian.jira.plugin.devstatus.rest.SummaryBean@5c811981[summary={pullrequest=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@c8ce4e8[overall=PullRequestOverallBean{stateCount=0, state=\'OPEN\', details=PullRequestOverallDetails{openCount=0, mergedCount=0, declinedCount=0}},byInstanceType={}], build=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@60617133[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BuildOverallBean@ba17273[failedBuildCount=0,successfulBuildCount=0,unknownBuildCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], review=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@5d358406[overall=com.atlassian.jira.plugin.devstatus.summary.beans.ReviewsOverallBean@28e1e5c7[stateCount=0,state=<null>,dueDate=<null>,overDue=false,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], deployment-environment=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@4362f101[overall=com.atlassian.jira.plugin.devstatus.summary.beans.DeploymentOverallBean@435031f4[topEnvironments=[],showProjects=false,successfulCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], repository=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@32b4882c[overall=com.atlassian.jira.plugin.devstatus.summary.beans.CommitOverallBean@15dc9c60[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], branch=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@41e29d23[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BranchOverallBean@37fdb7a[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}]},errors=[],configErrors=[]], devSummaryJson={"cachedValue":{"errors":[],"configErrors":[],"summary":{"pullrequest":{"overall":{"count":0,"lastUpdated":null,"stateCount":0,"state":"OPEN","details":{"openCount":0,"mergedCount":0,"declinedCount":0,"total":0},"open":true},"byInstanceType":{}},"build":{"overall":{"count":0,"lastUpdated":null,"failedBuildCount":0,"successfulBuildCount":0,"unknownBuildCount":0},"byInstanceType":{}},"review":{"overall":{"count":0,"lastUpdated":null,"stateCount":0,"state":null,"dueDate":null,"overDue":false,"completed":false},"byInstanceType":{}},"deployment-environment":{"overall":{"count":0,"lastUpdated":null,"topEnvironments":[],"showProjects":false,"successfulCount":0},"byInstanceType":{}},"repository":{"overall":{"count":0,"lastUpdated":null},"byInstanceType":{}},"branch":{"overall":{"count":0,"lastUpdated":null},"byInstanceType":{}}}},"isStale":false}}',
              customfield_11211: null,
              customfield_11213: null,
              customfield_10400: null,
              customfield_11214: null,
              customfield_11204: null,
              customfield_11205: null,
              environment: null,
              customfield_11206: null,
              customfield_10910: null,
              customfield_11207: null,
              customfield_10911: null,
              customfield_10912: null,
              customfield_11209: null,
              duedate: null,
              customfield_10913: null,
              comment: {
                comments: [],
                maxResults: 0,
                total: 0,
                startAt: 0,
              },
            },
          },
        ],
      };
      setStories(
        donnéesDesIssues.issues.map((issue) => {
          return {
            titre: issue.fields.summary,
            label: issue.key,
            état: issue.fields.status.name,
            type: issue.fields.issuetype.name,
            epic: issue.fields.epic.name,
          };
        }),
      );
    } catch (error) {}
  }

  useEffect(() => {
    récupèreLeSprintEtLesStories(sprintId);
  }, []);

  return (
    <main>
      <h2>Voici le visuel du sprint {sprintId}</h2>
      <p>Nom : {sprint.nom}</p>
      <p>Date de début : {sprint.dateDeDébut}</p>
      <p>Date de fin : {sprint.dateDeFin}</p>
      <ListeDesIssues stories={stories} />
    </main>
  );
};
