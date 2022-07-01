import { Response, Router, Request } from 'express';

const statusRoute = Router();

statusRoute.get('/status', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { statusRoute };
