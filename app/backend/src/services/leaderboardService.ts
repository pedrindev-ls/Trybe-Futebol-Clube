import Matches from '../interfaces/matchesInterface';
import Leaders from '../interfaces/leadersInterface';
import Teams from '../interfaces/teamInterface';

export default class LeaderboardsService {
  countGames = (id: number, matches: Matches[]) => {
    let total = 0;
    matches.forEach((element) => {
      if (element.homeTeam === id || element.awayTeam === id) {
        total += 1;
      }
    });
    return total;
  };

  countVictories = (id: number, matches: Matches[]) => {
    let total = 0;
    matches.forEach((element) => {
      if (element.homeTeam === id && element.homeTeamGoals > element.awayTeamGoals) {
        total += 1;
      }
      if (element.awayTeam === id && element.awayTeamGoals > element.homeTeamGoals) {
        total += 1;
      }
    });
    return total;
  };

  countDraws = (id: number, matches: Matches[]) => {
    let total = 0;
    matches.forEach((element) => {
      if (element.homeTeam === id && element.homeTeamGoals === element.awayTeamGoals) {
        total += 1;
      }
      if (element.awayTeam === id && element.awayTeamGoals === element.homeTeamGoals) {
        total += 1;
      }
    });
    return total;
  };

  countLoss = (id: number, matches: Matches[]) => {
    let total = 0;
    matches.forEach((element) => {
      if (element.homeTeam === id && element.homeTeamGoals < element.awayTeamGoals) {
        total += 1;
      }
      if (element.awayTeam === id && element.awayTeamGoals < element.homeTeamGoals) {
        total += 1;
      }
    });
    return total;
  };

  countPoints = (id: number, matches: Matches[]) => {
    let total = 0;
    matches.forEach((element) => {
      if (element.homeTeam === id) {
        if (element.homeTeamGoals > element.awayTeamGoals) {
          total += 3;
        }
        if (element.homeTeamGoals === element.awayTeamGoals) {
          total += 1;
        }
      } else if (element.awayTeam === id) {
        if (element.awayTeamGoals > element.homeTeamGoals) {
          total += 3;
        }
        if (element.awayTeamGoals === element.homeTeamGoals) {
          total += 1;
        }
      }
    }); return total;
  };

  countGoals = (id: number, matches: Matches[]) => {
    let total = 0;
    matches.forEach((element) => {
      if (element.homeTeam === id) {
        total += element.homeTeamGoals;
      } else if (element.awayTeam === id) {
        total += element.awayTeamGoals;
      }
    });
    return total;
  };

  countOtherTeamGoals = (id: number, matches: Matches[]) => {
    let total = 0;
    matches.forEach((element) => {
      if (element.homeTeam === id) {
        total += element.awayTeamGoals;
      } else if (element.awayTeam === id) {
        total += element.homeTeamGoals;
      }
    });
    return total;
  };

  cauculateEficiency = (id: number, matches: Matches[]) => {
    const points = this.countPoints(id, matches);
    const games = this.countGames(id, matches);

    const efficiency = (points / (games * 3)) * 100;

    return Number(efficiency.toFixed(2));
  };

  leaderBuild = (teams: Teams[], matches: Matches[]) => {
    const leaderTable: Leaders[] = [];
    teams.forEach((element: Teams) => {
      const team = {
        name: element.teamName,
        totalPoints: this.countPoints(element.id, matches),
        totalGames: this.countGames(element.id, matches),
        totalVictories: this.countVictories(element.id, matches),
        totalDraws: this.countDraws(element.id, matches),
        totalLosses: this.countLoss(element.id, matches),
        goalsFavor: this.countGoals(element.id, matches),
        goalsOwn: this.countOtherTeamGoals(element.id, matches),
        goalsBalance: this.countGoals(element.id, matches) - this
          .countOtherTeamGoals(element.id, matches),
        efficiency: this.cauculateEficiency(element.id, matches),
      };
      leaderTable.push(team);
    });
    return leaderTable;
  };

  async getLeaders(teams: Teams[], matches: Matches[]) {
    const items = this.leaderBuild(teams, matches);
    items.sort((a, b) => b.totalPoints - a.totalPoints);
    return items;
  }
}
