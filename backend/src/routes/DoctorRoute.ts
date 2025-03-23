import express from 'express';
import { addSlot, getSlot } from '../controller/doctorController';

const router = express.Router();

router.get('/getslot', getSlot as express.RequestHandler);
router.post('/addslot', addSlot as express.RequestHandler);

export default router;