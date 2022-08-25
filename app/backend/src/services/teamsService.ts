import Team from '../database/models/Teams';

export default class TeamsService {
  constructor(private teams = Team) {}

  async get() {
    const item = await this.teams.findAll();
    return item;
  }
}
