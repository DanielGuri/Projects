import { Router } from "express"; 
import { getAll } from "../controllers/client/controller";

const router = Router();

router.get('/', getAll);

export default router;