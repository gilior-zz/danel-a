import {  LnksRoutesHandler} from "../routesLogic/lnksRoutesHandler";
import * as express from 'express'
import * as bodyParser from 'body-parser'
let lnksRoutesHandler: LnksRoutesHandler = new LnksRoutesHandler();

export const lnksRouter = express.Router({ mergeParams: true });

lnksRouter.route('/')
  .get((req, res) => {
    lnksRoutesHandler.getAllHandler(req, res);
  })

