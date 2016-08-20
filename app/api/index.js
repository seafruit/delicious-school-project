import express from 'express';
import usersApi from './users';
import sessionApi from './sessions';

const router = express.Router();

router.use('/users', usersApi);
router.use('/sessions', sessionApi);
export default router;
