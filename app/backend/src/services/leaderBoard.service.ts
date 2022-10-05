import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import LeaderBoard from '../utils/leaderBoard';

export default class LeaderboardService {
  static getAll = async () => {
    const result = await TeamModel.findAll({
      include: {
        model: MatchModel,
        as: 'teamHome',
        where: { inProgress: false },
      },
    });

    const matches = result.map(LeaderBoard.generateLeaderboardHome);

    const sortMatches = LeaderBoard.sortLeaderboard(matches);
    return sortMatches;
  };

  static getAllAway = async () => {
    const result = await TeamModel.findAll({
      include: {
        model: MatchModel,
        as: 'teamAway',
        where: { inProgress: false },
      },
    });

    const matches = result.map(LeaderBoard.generateLeaderboardAway);

    const sortMatches = LeaderBoard.sortLeaderboard(matches);
    return sortMatches;
  };
}
