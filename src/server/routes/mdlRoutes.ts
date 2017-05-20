import { MdlsRoutesHandler } from "../routesLogic/mdlsRoutesLogic";
import * as express from 'express'
import * as bodyParser from 'body-parser'
let mdlsRoutesHandler: MdlsRoutesHandler = new MdlsRoutesHandler();

export const mdlsRouter = express.Router({ mergeParams: true });

mdlsRouter.route('/')
  .get((req, res) => {
    mdlsRoutesHandler.getAllHandler(req, res);
  })

