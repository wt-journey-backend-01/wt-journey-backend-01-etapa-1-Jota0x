const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

// Configuração de Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.get('/api/lanches', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});

//Processamento de sugestão
app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    if (!nome || !ingredientes) {
        return res.status(400).send("Por favor, forneça o nome e os ingredientes da sugestão.");
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sugestão Recebida</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <main>
                <h1>Obrigado pela sua Sugestão!</h1>
                <p>Seu lanche **${nome}** com ingredientes: **${ingredientes}** foi recebido com sucesso.</p>
                <a href="/">Voltar ao Cardápio</a>
            </main>
        </body>
        </html>
    `);
})

//Precessamento de Contato
app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    console.log("Contato Recebido:", req.body);

    res.redirect(`/contato-recebido?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&assunto=${encodeURIComponent(assunto)}&mensagem=${encodeURIComponent(mensagem)}`);
});


//Exibição de Contato
app.get('/contato-recebido', (req, res) => {
    const { nome, email, assunto, mensagem } = req.query;

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contato Recebido</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <main>
                <h1>Mensagem Recebida com Sucesso, ${nome}!</h1>
                <p>Agradecemos o seu contato. Detalhes da mensagem:</p>
                <ul>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Assunto:</strong> ${assunto}</li>
                    <li><strong>Mensagem:</strong> ${mensagem}</li>
                </ul>
                <a href="/">Voltar ao Cardápio</a>
            </main>
        </body>
        </html>
    `);
});

//Erro 404
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Não Encontrado</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <main>
                <h1>Erro 404: Página Não Encontrada</h1>
                <p>Ops! Não conseguimos encontrar a página que você está procurando.</p>
                <a href="/">Voltar para a página inicial</a>
            </main>
        </body>
        </html>
    `);
});

//Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});