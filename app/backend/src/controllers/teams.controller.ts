import { Request, Response } from 'express';
import TeamModel from '../database/models/TeamModel';
import TeamService from '../services/team.service';

export default class TeamsController {
  static getAll = async (req: Request, res: Response) => {
    const teams = await TeamService.getAll() as unknown as TeamModel;

    if (!teams) {
      return res.status(401).json({ message: 'No teams were found' });
    }

    return res.status(200).json(teams);
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamById = await TeamService.getById(Number(id)) as TeamModel;

    if (!teamById) {
      return res.status(401).json({ message: 'No team were found' });
    }

    return res.status(200).json(teamById);
  };
}
