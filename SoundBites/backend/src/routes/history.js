import express from 'express';
import { getHistory, addToHistory } from '../controllers/historyController.js';
const router = express.Router();

router.get('/', getHistory);
router.post('/add', addToHistory);

export default router;

