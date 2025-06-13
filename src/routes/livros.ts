import { Router } from "express";
import LivroController from "../controllers/livroController";

const router = Router();

router.get("/", LivroController.getLivros);
router.get("/:id", (req, res, next) => {
    LivroController.getLivroById(req, res).catch(next);
});
router.post("/", LivroController.createLivro);
router.put("/:id", LivroController.updateLivro);
router.delete("/:id", LivroController.deleteLivro);

export default router;
