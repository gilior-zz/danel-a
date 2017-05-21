import { RlrsRoutesHandler } from "../routesLogic/rlrsRoutesLogic";
import * as express from 'express'
import * as bodyParser from 'body-parser'
let mdlsRoutesHandler: RlrsRoutesHandler = new RlrsRoutesHandler();

export const mdlsRouter = express.Router({ mergeParams: true });

mdlsRouter.route('/')
  .get((req, res) => {
    rlrsRoutesHandler.getAllHandler(req, res);
  })
