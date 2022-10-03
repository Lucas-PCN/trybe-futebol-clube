import { Match } from '../interfaces/match.interface';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import TeamService from '../services/team.service';

export default class MatchService {
  static getAll = async () => {
    const result = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    if (!result) return false;

    return result;
  };

  static getWithQuery = async (query: boolean) => {
    const result = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
      where: { inProgress: query },
    });

    if (!result) return false;

    return result;
  };

  static createMatch = async (match: Match) => {
    const checkTeamHome = await TeamService.getById(match.homeTeam);
    if (!checkTeamHome) return false;
    const checkTeamAway = await TeamService.getById(match.awayTeam);
    if (!checkTeamAway) return false;

    const result = await MatchModel.create(match);

    return {
      id: result.id,
      ...match,
      inProgress: result.inProgress,
    };
  };
}
