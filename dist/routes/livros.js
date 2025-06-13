"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const livroController_1 = __importDefault(require("../controllers/livroController"));
const router = (0, express_1.Router)();
router.get("/", livroController_1.default.getLivros);
router.get("/:id", (req, res, next) => {
    livroController_1.default.getLivroById(req, res).catch(next);
});
router.post("/", livroController_1.default.createLivro);
router.put("/:id", livroController_1.default.updateLivro);
router.delete("/:id", livroController_1.default.deleteLivro);
exports.default = router;
