import express from 'express';

const app = express();

app.get("/", (request, response) => {
    return response.json({ message: "Hello World - NLW04" });
});

// 1 param => Rota(Recurso API)
// 2 param => request, response

app.post("/", (request, response) => {
    // Recebeu os dados para salvar
    return response.json({ message: "Os dados foram salvos com sucesso!" });
});

// 1 param => Porta Utilizada
app.listen(3333, () => console.log("Server is running!"));
