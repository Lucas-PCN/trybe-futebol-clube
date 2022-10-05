import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoard.service';

export default class LeaderboardsController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const result = await LeaderboardService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
    }
  };

  static getAllDone = async (req: Request, res: Response) => {
    try {
      const result = await LeaderboardService.getAllAway();
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
    }
  };
}
