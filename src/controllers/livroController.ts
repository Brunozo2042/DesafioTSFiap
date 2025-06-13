import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controlador para gerenciar operações CRUD de livros

// Listar todos os livros
const getLivros = async (req: Request, res: Response) => {
    try {
        const livros = await prisma.livro.findMany();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar livros" });
    }
};

// Obter um livro por ID
const getLivroById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) },
        });
        if (!livro)
            return res.status(404).json({ error: "Livro não encontrado" });
        res.json(livro);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar livro" });
    }
};

// Criar um novo livro
const createLivro = async (req: Request, res: Response) => {
    const { title, author, year } = req.body;
    try {
        const novoLivro = await prisma.livro.create({
            data: { title, author, year },
        });
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar livro" });
    }
};

// Atualizar um livro existente
const updateLivro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, year } = req.body;
    try {
        const livroAtualizado = await prisma.livro.update({
            where: { id: Number(id) },
            data: { title, author, year },
        });
        res.json(livroAtualizado);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar livro" });
    }
};

// Deletar um livro
const deleteLivro = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.livro.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar livro" });
    }
};

const LivroController = {
    getLivros,
    getLivroById,
    createLivro,
    updateLivro,
    deleteLivro,
};

export default LivroController;
