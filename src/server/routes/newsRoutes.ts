import { NewsRoutesHandler } from '../routesLogic/newsRoutesHandler';


import * as express from 'express'
import * as bodyParser from 'body-parser'
let newsRoutesHandler: NewsRoutesHandler = new NewsRoutesHandler();

export const newsRouter = express.Router({ mergeParams: true });

newsRouter.route('/')
  .get((req, res) => {
    newsRoutesHandler.getAllHandler(req, res);
  })
