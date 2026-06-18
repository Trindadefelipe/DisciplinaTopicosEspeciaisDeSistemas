const express = require("express");
const app = express();
const db = require('./models/db/db');
const {criaToken, verificaPulseiraVIP} = require('./middlewares/validaToken')

//configurações
app.set("view engine", "EJS");
app.use(express.urlencoded({extended: true}));
app.set("views", "./src/views");
app.use(express.json());
const PORTA = 3000;

//READ: Listar os usuario
app.get("/", verificaPulseiraVIP, async (req, res) => {
    const usuariosBanco = await db.query('SELECT * FROM usuarios');
    console.log(`resultado do banco: ${JSON.stringify(usuariosBanco.rows)}`)
    res.render("index", {usuarios:  usuariosBanco.rows})
});
//READ: Listar usuario especifico
app.get("/usuario/:id", verificaPulseiraVIP, async (req, res) => {
    const id = parseInt(req.params.id)
    const usuariosBanco = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    console.log(`resultado do banco: ${JSON.stringify(usuariosBanco.rows)}`)
    res.render("index", {usuarios:  usuariosBanco.rows})
});

//CREATE: Fomulário de adição
app.get("/adicionar", verificaPulseiraVIP, (req, res) => {
    res.render("adicionar");
});

//CREATE: Recebe os dados e salva
app.post("/adicionar", verificaPulseiraVIP, async (req, res) => {
    const{ nome, email } = req.body;
    const query = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *';
    const values = [nome, email];

    try {
        const respostaBanco = await db.query(query, values);
        console.log("Resposta do banco: ", respostaBanco.rows[0]);
    } catch (err) {
        console.error("Erro ao inserir: ", err);
    }  finally {
        res.redirect('/');
    }
});

//UPDATE: Formulário de edição
app.get("/editar/:id", verificaPulseiraVIP, async (req, res) => {
    const id = parseInt(req.params.id);
    const linhas = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    const usuario = linhas.rows[0];
    if (!usuario) return res.status(404).send("Usuario não encontrado");
    res.render("editar", {usuario});
});

//UPDATE: Receber os dados e eventos
app.post("/editar/:id", verificaPulseiraVIP, async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email } = req.body;

    const query = 'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3';
    const values = [nome, email, id];

    try {
        const respostaBanco = await db.query(query, values);
        console.log('Quantidade de linhas alteradas: ', respostaBanco.rowCount);
    } catch (err) {
        console.error("Erro ao atulizar: ", err);
    }  finally {
        res.redirect('/');
    }
});

//DELETE: Remover o usuário
app.post("/deletar/:id", verificaPulseiraVIP, async (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'DELETE FROM usuarios WHERE id = $1';
    const values = [id];

    try {
        const respostaBanco = await db.query(query, values);
        console.log("Linhas afetadas: ", respostaBanco.rowCount);
    } catch (err) {
        console.log("Erro ao deletar", err);
    } finally {
        res.redirect('/');
    }
});

app.post('/login', async (req, res) => {
    const {email, senha} = req.body;
    
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);

    const usuario = result.rows[0];

    if (!usuario) {
        return res.status(401).send('<h1>Acesso negado! Verifique email e/ou senha...</h1>');
    }

    const token = criaToken(usuario);
    res.json({mensagem: 'Logado com sucesso', token})
});

//Middleware
function segurancaDaBalada(req, res, next){
    //1° O segurança olha para a mão do usuário(Headers de requisição)
    const token = req.headers['authorization'];

    //2° Se o usuario chegou sem token
    if(!token){
        return res.status(401).send('<h1>Acesso Negado!</h1>');
    }

    //3° Se tem o tokem, verifica se é valida
    //O padrão esperado é "Bearer <token>"
    if(token  === 'Bearer PULSEIRA_VIP_'){
        next();
    } else {
        //Se a pulseira for de outra festa
        return res.status(403).send('<h1>Acesso negado!</h1>');
    }
}

app.listen(PORTA , () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
