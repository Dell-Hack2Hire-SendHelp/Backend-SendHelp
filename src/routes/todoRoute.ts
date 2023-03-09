
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const db = new PrismaClient();


router.get('/', function (req, res) {
    res.send('Hello from APIv1 root route.');
});

router.get('/users', function (req, res) {
    res.send('List of APIv1 users.');
});


export default router;