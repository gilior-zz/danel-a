import { EnvsRoutesHandler } from '../routesLogic/envsRoutesHandler';


import * as express from 'express'
import * as bodyParser from 'body-parser'
let envsRoutesHandler: EnvsRoutesHandler = new EnvsRoutesHandler();

export const envsRouter = express.Router({ mergeParams: true });

envsRouter.route('/')
  .get((req, res) => {
    envsRoutesHandler.getAllHandler(req, res);
  })
