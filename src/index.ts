import express from "express";
import cors from "cors";
import router from "./routes/livros";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/livros", router);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
