export default class LeaderBoard {
  static teamGoals = (matches: any) => {
    const goalsFavor = matches.reduce((a: number, b: any) => a + b.homeTeamGoals, 0);

    const goalsOwn = matches.reduce((a: number, b: any) => a + b.awayTeamGoals, 0);

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  };

  static teamGoalsAway = (matches: any) => {
    const goalsFavor = matches.reduce((a: number, b: any) => a + b.awayTeamGoals, 0);

    const goalsOwn = matches.reduce((a: number, b: any) => a + b.homeTeamGoals, 0);

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  };

  static matchesResult = (matches: any) => {
    const points = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      totalPoints: 0,
    };

    matches.forEach((match: any) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        points.totalVictories += 1;
        points.totalPoints += 3;
      }

      if (match.homeTeamGoals < match.awayTeamGoals) points.totalLosses += 1;

      if (match.homeTeamGoals === match.awayTeamGoals) {
        points.totalDraws += 1;
        points.totalPoints += 1;
      }
    });

    return points;
  };

  static matchesResultAway = (matches: any) => {
    const points = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      totalPoints: 0,
    };

    matches.forEach((match: any) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        points.totalVictories += 1;
        points.totalPoints += 3;
      }

      if (match.homeTeamGoals > match.awayTeamGoals) points.totalLosses += 1;

      if (match.homeTeamGoals === match.awayTeamGoals) {
        points.totalDraws += 1;
        points.totalPoints += 1;
      }
    });

    return points;
  };

  static efficiencyCalc =
  (totalPoints: number, totalMatches: number) =>
    Number((totalPoints / (totalMatches * 3)) * 100).toFixed(2);

  static generateLeaderboardHome = (team: any) => {
    const totalGames = team.teamHome.length;

    const goals = LeaderBoard.teamGoals(team.teamHome);
    const points = LeaderBoard.matchesResult(team.teamHome);
    const efficiency = LeaderBoard.efficiencyCalc(points.totalPoints, totalGames);
    return {
      name: team.teamName,
      totalGames,
      ...goals,
      ...points,
      efficiency,
    };
  };

  static generateLeaderboardAway = (team: any) => {
    const totalGames = team.teamAway.length;

    const goals = LeaderBoard.teamGoalsAway(team.teamAway);
    const points = LeaderBoard.matchesResultAway(team.teamAway);
    const efficiency = LeaderBoard.efficiencyCalc(points.totalPoints, totalGames);
    return {
      name: team.teamName,
      totalGames,
      ...goals,
      ...points,
      efficiency,
    };
  };

  static sortLeaderboard = (leaderboard: any) => {
    const sorting = leaderboard.sort((a: any, b: any) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      return 0;
    });
    return sorting;
  };

  static sortLeaderboardAway = (leaderboard: any) => {
    const sorting = leaderboard.sort((a: any, b: any) => {
      if (a.totalPoints > b.totalPoints) return 1;
      if (a.totalPoints < b.totalPoints) return -1;
      if (a.totalVictories > b.totalVictories) return 1;
      if (a.totalVictories < b.totalVictories) return -1;
      if (a.goalsBalance > b.goalsBalance) return 1;
      if (a.goalsBalance < b.goalsBalance) return -1;
      if (a.goalsFavor > b.goalsFavor) return 1;
      if (a.goalsFavor < b.goalsFavor) return -1;
      if (a.goalsOwn > b.goalsOwn) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
      return 0;
    });
    return sorting;
  };
}
