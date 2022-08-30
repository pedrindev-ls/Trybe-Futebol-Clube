import Team from '../database/models/Teams';
import Match from '../database/models/Matches';
import MatchStats from '../interfaces/matchStats';
import ErrorInterface from '../interfaces/errorInterface';

export default class MatchesService {
  constructor(private match = Match, private team = Team) {}

  async get() {
    const items = await this.match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: {
          exclude: ['id'],
        },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: {
          exclude: ['id'],
        },
      },
      ],
    });
    return items;
  }

  async getProgress(inProgress: boolean) {
    const items = await this.match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: {
          exclude: ['id'],
        },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: {
          exclude: ['id'],
        },
      },
      ],
      where: { inProgress },
    });
    return items;
  }

  async addMatch(matchStats: MatchStats) {
    const team1 = await this.team.findByPk(matchStats.awayTeam);
    const team2 = await this.team.findByPk(matchStats.homeTeam);
    if (!team1 || !team2) {
      const error: ErrorInterface = new Error('There is no team with such id!');
      error.status = 404;
      throw error;
    }
    if (matchStats.awayTeam === matchStats.homeTeam) {
      const error: ErrorInterface = new Error(
        'It is not possible to create a match with two equal teams',
      );
      error.status = 401;
      throw error;
    }
    const newMatch = await this.match.create({ ...matchStats, inProgress: true });
    return newMatch;
  }

  async finish(id: number) {
    await this.match.update({ inProgress: false }, { where: { id } });
    return 'done';
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return 'done';
  }
}
