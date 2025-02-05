import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("Erro", erro);
})

conexao.once("open", () => {
    console.log("Conexão feita com sucesso.")
})

const app = express();
routes(app);

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index])
})

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso');
})

export default app;
