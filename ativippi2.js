const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0';

var listaFrutas = [];

function cadastroFrutaView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Frutas</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="mb-5">Cadastro de Frutas</h1>
                    <form method="POST" action="/cadastrarFruta" class="border p-3 row g-3" novalidate>
                        <div class="col-md-6">
                            <label for="nome" class="form-label">Nome da Fruta</label>
                            <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite o nome da fruta" required>
                        </div>
                        <div class="col-md-6">
                            <label for="tipo" class="form-label">Tipo</label>
                            <input type="text" class="form-control" id="tipo" name="tipo" required>
                        </div>
                        <div class="col-md-6">
                            <label for="preco" class="form-label">Preço (R$)</label>
                            <input type="number" class="form-control" id="preco" name="preco" step="0.01" required>
                        </div>
                        <div class="col-md-6">
                            <label for="quantidade" class="form-label">Quantidade</label>
                            <input type="number" class="form-control" id="quantidade" name="quantidade" required>
                        </div>
                        <div class="col-md-12">
                            <label for="descricao" class="form-label">Descrição</label>
                            <textarea class="form-control" id="descricao" name="descricao" rows="3" placeholder="Digite uma descrição da fruta"></textarea>
                        </div>
                        <div class="col-md-12">
                            <label for="imagem" class="form-label">URL da Imagem</label>
                            <input type="url" class="form-control" id="imagem" name="imagem" placeholder="Cole o link da imagem da fruta">
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
}

function cadastrarFruta(req, resp) {
    const nome = req.body.nome;
    const tipo = req.body.tipo;
    const preco = parseFloat(req.body.preco);
    const quantidade = parseInt(req.body.quantidade);
    const descricao = req.body.descricao || '';
    const imagem = req.body.imagem || '';

    const fruta = { nome, tipo, preco, quantidade, descricao, imagem };
    listaFrutas.push(fruta);

    resp.redirect('/listaFrutas');  
}

app.get('/listaFrutas', (req, resp) => {
    let html = `
        <html>
            <head>
                <title>Lista de Frutas</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    for (const fruta of listaFrutas) {
        html += `
            <tr>
                <td>${fruta.nome}</td>
                <td>${fruta.tipo}</td>
                <td>${fruta.preco.toFixed(2)}</td>
                <td>${fruta.quantidade}</td>
                <td>${fruta.descricao}</td>
                <td><img src="${fruta.imagem}" alt="${fruta.nome}" style="width: 50px; height: auto;"></td>
            </tr>
        `;
    }

    html += `
                    </tbody>
                </table>
                <a class="btn btn-primary" href="/cadastrarFruta">Continuar Cadastrando</a>
                <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `;

    resp.send(html);  
});

app.get('/', (req, resp) => {
    resp.send(`
        <html>
            <head>
                <title>Menu</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="mt-5">Bem-vindo ao Sistema de Cadastro de Frutas</h1>
                    <p class="lead">Este sistema permite que você cadastre frutas com informações detalhadas, como nome, tipo, preço, quantidade, descrição e uma imagem.</p>
                    <nav class="navbar navbar-expand-lg bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">MENU</a>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div class="navbar-nav">
                                    <a class="nav-link active" aria-current="page" href="/cadastrarFruta">Cadastrar Fruta</a>
                                    <a class="nav-link" href="/listaFrutas">Ver Lista de Frutas</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
});

app.get('/cadastrarFruta', cadastroFrutaView);
app.post('/cadastrarFruta', cadastrarFruta);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});
