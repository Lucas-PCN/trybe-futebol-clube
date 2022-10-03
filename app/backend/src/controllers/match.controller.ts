import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import MatchModel from '../database/models/MatchModel';
import { Match, Progress } from '../interfaces/match.interface';

export default class MatchController {
  static getAll = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      const { inProgress } = req.query as unknown as Progress;

      const parseInProgress = JSON.parse(inProgress);

      const matches = await MatchService
        .getWithQuery(parseInProgress) as unknown as MatchModel;

      if (!matches) {
        return res.status(401).json({ message: 'No matches were found' });
      }

      return res.status(200).json(matches);
    }
    const matches = await MatchService.getAll() as unknown as MatchModel;

    if (!matches) {
      return res.status(401).json({ message: 'No matches were found' });
    }

    return res.status(200).json(matches);
  };

  static create = async (req: Request, res: Response) => {
    const match = req.body as unknown as Match;

    if (match.homeTeam === match.awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const result = await MatchService.createMatch(match) as unknown as MatchModel;

    if (!result) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    return res.status(201).json(result);
  };

  static finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await MatchService.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  static editMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchService.editMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Match sucess editted' });
  };
}
