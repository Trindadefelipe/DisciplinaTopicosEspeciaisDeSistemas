const db = require('../db/db');

async function carregarUsuarios(){
    const query = 'SELECT * FROM usuarios';
    const result = await db.query(query);
    return result.rows;
}

async function editarUsuario(usuario){
    const query = 'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3';
    const values = [usuario.nome, usuario.email, usuario.id];
    const result = await db.query(query, values);
    return result.rowCount;
}

async function buscarUsuarios(nome) {
    const query = 'SELECT * FROM usuarios WHERE nome = $1';
    const values = [nome];
    const result = await db.query(query, values);
    return result.rows;
}

module.exports = {carregarUsuarios, editarUsuario, buscarUsuarios};
