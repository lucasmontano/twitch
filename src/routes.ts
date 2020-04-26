import { Router } from 'express';
import GuestController from './app/controllers/GuestController';

const router = Router({ caseSensitive: false });

router.get('/', GuestController.index);

export default router;
