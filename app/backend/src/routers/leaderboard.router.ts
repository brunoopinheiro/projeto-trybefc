import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';
import TeamsModel from '../database/models/TeamModel';

const leaderboardRouter = Router();

const lService = new LeaderboardService(TeamsModel);
const lController = new LeaderboardController(lService);

leaderboardRouter.get('/', lController.getLeaderboard);
leaderboardRouter.get('/home', lController.getHomeLeaderboard);
leaderboardRouter.get('/away', lController.getAwayLeaderboard);

export default leaderboardRouter;
