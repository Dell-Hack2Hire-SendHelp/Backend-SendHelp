import { Router } from "express";
import todoRoute from "./todoRoute";
import authRoute from "./authRoute";
import apeRoute from "./apeRoute";
import custRoute from "./custRoute";


const router = Router();

router.use('/todo', todoRoute);
router.use('/auth', authRoute);
router.use('/ape', apeRoute);
router.use('/cust', custRoute);

router.get('/test', (req, res) => {
    res.cookie('test', 'test');
    res.status(200).json({ message: "Test route" });
});


export default router;

