import { Router } from 'express';
import authRouter from './authRoute'
import userRouter from './userRoute'
const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);


router.get('/health-check', (_req, res) => {
    res.status(200).send("health-check { status : OK } ");
    console.log('health-check')
})

export default router;