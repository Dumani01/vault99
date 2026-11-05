import {Router} from 'express';
import controller from '../controllers/tenis.controller.js';
const router=Router();
router.route('/').get(controller.list).post(controller.create);
router.route('/:id').get(controller.get).put(controller.update).delete(controller.remove);
export default router;
