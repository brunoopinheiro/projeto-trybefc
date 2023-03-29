import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';
import TeamsModel from '../database/models/TeamModel';

const teamRouter = Router();

const teamsService = new TeamsService(TeamsModel);
const teamsController = new TeamsController(teamsService);

teamRouter.get('/', teamsController.getAll);
teamRouter.get('/:id', teamsController.getById);

export default teamRouter;
