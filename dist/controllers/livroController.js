"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Controlador para gerenciar operações CRUD de livros
// Listar todos os livros
const getLivros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const livros = yield prisma.livro.findMany();
        res.json(livros);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar livros" });
    }
});
// Obter um livro por ID
const getLivroById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const livro = yield prisma.livro.findUnique({
            where: { id: Number(id) },
        });
        if (!livro)
            return res.status(404).json({ error: "Livro não encontrado" });
        res.json(livro);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar livro" });
    }
});
// Criar um novo livro
const createLivro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, year } = req.body;
    try {
        const novoLivro = yield prisma.livro.create({
            data: { title, author, year },
        });
        res.status(201).json(novoLivro);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar livro" });
    }
});
// Atualizar um livro existente
const updateLivro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, year } = req.body;
    try {
        const livroAtualizado = yield prisma.livro.update({
            where: { id: Number(id) },
            data: { title, author, year },
        });
        res.json(livroAtualizado);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar livro" });
    }
});
// Deletar um livro
const deleteLivro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.livro.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao deletar livro" });
    }
});
const LivroController = {
    getLivros,
    getLivroById,
    createLivro,
    updateLivro,
    deleteLivro,
};
exports.default = LivroController;
