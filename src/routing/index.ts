import { Router } from 'express';
import { transformHELMtoSVG } from '../controllers/transformer';

const router = Router();

router.get(/\/transform-helm-to-svg\/.+/, transformHELMtoSVG);

export default router;
