import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import MatchModel from '../database/models/MatchModel';
import authMiddleware from '../middlewares/auth.middleware';

const matchesRouter = Router();

const matchesService = new MatchesService(MatchModel);
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', matchesController.getAll);
matchesRouter.patch('/:id/finish', authMiddleware, matchesController.endMatch);
matchesRouter.patch('/:id', authMiddleware, matchesController.updateMatch);

export default matchesRouter;
