import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  static getAll = async () => {
    const result = await TeamModel.findAll();
    if (!result) return false;

    return result;
  };

  static getById = async (id: number) => {
    const result = await TeamModel.findByPk(id);
    if (!result) return false;

    return result;
  };
}
