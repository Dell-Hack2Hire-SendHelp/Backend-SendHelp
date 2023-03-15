import { Router } from "express";
import todoRoute from "./todoRoute";
import authRoute from "./authRoute";
import apeRoute from "./apeRoute";
import custRoute from "./custRoute";
import sukauRoute from "./sukauRoute";


const router = Router();

router.use('/todo', todoRoute);
router.use('/auth', authRoute);
router.use('/ape', apeRoute);
router.use('/cust', custRoute);
router.use('/sukau', sukauRoute);



export default router;

