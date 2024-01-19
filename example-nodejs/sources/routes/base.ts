import express, { Request, Response, Router } from "express";
import path from 'path';
import webServerConfig from "../configs/webserver.config";

const baseRouter = Router();

baseRouter.use('/', express.static(webServerConfig.staticPath.appFront, { redirect: false }));
baseRouter.all('*', (req: Request, res: Response) => {
    res.sendFile(path.join(webServerConfig.staticPath.appFront, 'index.html'));
});


export default baseRouter;
