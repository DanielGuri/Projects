import { Router } from "express"; 
import validate from "../middlewares/input-validation";
import { add, getAll, remove } from "../controllers/task/controller";
import { addTaskValidator } from "../controllers/task/validator";

const router = Router();

router.get('/', getAll);
router.post('/', validate(addTaskValidator), add);
router.delete('/:id', remove);

export default router;