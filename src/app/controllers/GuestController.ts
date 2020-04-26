import { Request, Response } from 'express';

/**
 * @class GuestController
 */
class GuestController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.json({ hello: 'world' });
  }
}

export default new GuestController();
