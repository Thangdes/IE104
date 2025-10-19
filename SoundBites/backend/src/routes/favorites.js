import express from 'express';
import { likeSong, unlikeSong, isSongLiked } from '../controllers/favoriteController.js';
const router = express.Router();

router.post('/like', likeSong);
router.post('/unlike', unlikeSong);
router.get('/is-liked', isSongLiked);

export default router;
