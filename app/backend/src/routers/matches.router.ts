import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import MatchModel from '../database/models/MatchModel';

const matchesRouter = Router();

const matchesService = new MatchesService(MatchModel);
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', matchesController.getAll);

export default matchesRouter;
