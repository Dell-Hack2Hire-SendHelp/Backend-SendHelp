import { Router } from "express";
import todoRoute from "./todoRoute";
import authRoute from "./authRoute";


const router = Router();

router.use('/todo', todoRoute);
router.use('/auth', authRoute);


router.get('/', (req, res)=> {
    res.json({ message: "Hello world" });
});



export default router;

