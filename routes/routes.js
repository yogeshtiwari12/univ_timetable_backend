import express from 'express';
const router = express.Router();
import { savedata,fetchdata,login } from '../methods/methods.js';
router.post('/savedata',savedata);
router.post('/fetchdata',fetchdata);
router.post('/login',login)
// router.post('/signup',signup);

export default router;
