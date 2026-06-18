//Configurando JWT
const jwt = require('jsonwebtoken');
const SECRET ='vX473UgEEL2IqG6gRtdDCefPmjfxgC67';

function criaToken(usuario) {
  //Criando o token JWT
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome },
    SECRET, //Assinatura (nosso selo)
    { expiresIn: "1h" }, //definindo duração do token
  );

  return token;
}

//Middleware
function verificaPulseiraVIP(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send("<h1>Você não tem a pulseira VIP (Token Ausente)</h1>");
  }

  const tokenLimpo = token.split(' ')[1] || token;

  jwt.verify(tokenLimpo, SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Pulseira falsa ou vencida (Token inválido!)");

    req.usuario = decoded; //Salva os dados do usuario para a rota poder usar

    next();
  });
}

module.exports = { criaToken, verificaPulseiraVIP };
