import Team from '../database/models/Teams';

export default class TeamsService {
  constructor(private teams = Team) {}

  async get() {
    const item = await this.teams.findAll();
    return item;
  }

  async getTeam(id: number) {
    const item = await this.teams.findByPk(id);
    return item;
  }
}
