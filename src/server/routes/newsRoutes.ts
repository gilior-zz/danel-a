import { RlrsRoutesHandler } from '../routesLogic/newsRoutesHandler';


import * as express from 'express'
import * as bodyParser from 'body-parser'
let rlrsRoutesHandler: RlrsRoutesHandler = new RlrsRoutesHandler();

export const newsRouter = express.Router({ mergeParams: true });

newsRouter.route('/')
  .get((req, res) => {
    rlrsRoutesHandler.getAllHandler(req, res);
  })
