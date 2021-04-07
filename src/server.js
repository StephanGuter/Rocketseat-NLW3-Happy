// Importar dependencia/pacote/plugin/lib/etc
const { response } = require("express");
const express = require("express");
const path = require("path");
const pages = require('./pages.js');

// Iniciando o express
const server = express();

server
    // Utilizando o body da requisição
    .use(express.urlencoded({ extended: true }))
    // Utilizando os arquivos estáticos
    .use(express.static("public"))

    // Configurar template engine
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'hbs')

    //// Criar uma rota
    // .get('/', (request, response) => {
    //     //console.log(__dirname);
    //     //return response.send("_m/ Direto do back-end!");
    //     //return response.sendFile(path.join(__dirname, "views", "index.html"));
    //     return response.render('index');
    // })

    // Chamar uma rota
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage)
    .post('/save-orphanage', pages.saveOrphanage)

// Ligar o servidor
server.listen(5500);