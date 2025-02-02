import express from 'express';
import { create, getAll, getById, update, remove } from '../controller/blogController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',authMiddleware, create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;
