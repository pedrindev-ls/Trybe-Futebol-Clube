import Team from '../database/models/Teams';
import Match from '../database/models/Matches';

export default class MatchesService {
  constructor(private match = Match) {}

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

  async getProgress(inProgress: string) {
    const items = await this.match.findOne({
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
}
