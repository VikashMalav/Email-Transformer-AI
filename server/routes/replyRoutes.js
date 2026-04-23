import express from 'express';
import { generateReply, saveReply, getReplies, deleteAllHistory, deleteReply } from '../controllers/replyController.js';

const router = express.Router();

router.post('/generate-reply', generateReply);
router.post('/save-reply', saveReply);
router.get('/replies', getReplies);
router.delete('/replies', deleteAllHistory);
router.delete('/replies/:id', deleteReply);

export default router;
