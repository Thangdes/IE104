import express from 'express';
import { likeSong, unlikeSong, isSongLiked, getAllFavorites } from '../controllers/favoriteController.js';
const router = express.Router();

router.get('/', getAllFavorites);
router.post('/like', likeSong);
router.post('/unlike', unlikeSong);
router.get('/is-liked', isSongLiked);

export default router;
