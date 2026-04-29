/* =====================================================================
   LISTA DE REVISÃO — JAVASCRIPT
   Tópicos Especiais de Sistemas
   ===================================================================== */

/* ---------------------------------------------------------------------
1. Um assunto importante na linguagem Javascript é a presença dos Closures.
   Explique o que são e quando eles acontecem.

R: Closure é uma função interna que "lembra" do escopo onde foi criada —
   ou seja, ela carrega junto as variáveis e o escopo da função externa,
   mesmo depois que essa função externa já terminou de executar.
   Funciona como uma "mochila" que a função leva consigo.

   QUANDO ACONTECEM: sempre que uma função interna usa variáveis da função
   externa E é retornada, passada como callback ou guardada em algum lugar
   fora do escopo onde nasceu.

   PRA QUE SERVE: criar variáveis privadas, manter estado entre chamadas,
   encapsular dados (segurança).

   EXEMPLO:
     function criarContador() {
       let contagem = 0;            // fica preso na "mochila"
       return function() {
         return ++contagem;          // acessa contagem mesmo após criarContador() terminar
       };
     }
     const c = criarContador();
     c(); // 1
     c(); // 2
     // 'contagem' não pode ser acessada de fora — está protegida.
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
2. Qual é a principal função do bloco try/catch em um tratamento de
   exceções em JavaScript? Quando ele deve ser utilizado?

R: A função do try/catch é capturar erros (exceções) em tempo de execução
   sem deixar o programa quebrar. O bloco 'try' envolve o código que pode
   falhar, e o 'catch' recebe o erro caso aconteça, permitindo tratá-lo de
   forma controlada (mostrar mensagem, registrar log, tentar de novo, etc).

   QUANDO USAR: em qualquer operação que possa falhar por motivos externos
   ao código — input do usuário, parse de JSON, leitura de arquivo,
   requisição de rede, conversão de tipos, divisão, etc.

   EXEMPLO:
     try {
       const dados = JSON.parse(textoVindoDoUsuario); // pode falhar
       console.log(dados.nome);
     } catch (erro) {
       console.log("JSON inválido: " + erro.message);
     }
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
3. Em JavaScript, o que é assincronismo e como ele é utilizado para
   melhorar o desempenho de aplicações web? Explique utilizando um exemplo
   prático com async e await.

R: JavaScript é single-thread (executa uma coisa por vez). Operações lentas
   (rede, banco de dados, leitura de arquivo, timers) bloqueariam a página
   inteira se fossem síncronas. O ASSINCRONISMO permite iniciar uma
   operação e continuar executando outras tarefas, lidando com o resultado
   só quando ele estiver pronto — sem travar a interface.

   - 'async' marca uma função como assíncrona (sempre retorna uma Promise).
   - 'await' pausa a execução DENTRO da função async até a Promise resolver,
     mas sem travar o resto da aplicação.

   GANHO DE DESEMPENHO: a aplicação continua respondendo (UI fluida)
   enquanto espera dados do servidor.

   EXEMPLO:
     async function buscarUsuario() {
       try {
         const resposta = await fetch("https://api.exemplo.com/user/1");
         const usuario = await resposta.json();
         console.log(usuario.nome);
       } catch (erro) {
         console.log("Falha:", erro.message);
       }
     }
     buscarUsuario();
     console.log("Isso é exibido ANTES do resultado da fetch.");
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
4. Em Javascript as variáveis possuem a característica de serem de tipagem
   fraca e tipagem dinâmica. O que isso significa, respectivamente?

R: TIPAGEM FRACA: a linguagem converte tipos automaticamente quando o
   contexto exige (coerção implícita). Não é necessário declarar o tipo,
   e operações entre tipos diferentes são permitidas.
       Ex: "5" + 1   →  "51"   (number virou string)
           "5" * 2   →   10    (string virou number)

   TIPAGEM DINÂMICA: o tipo da variável é definido em tempo de execução,
   não na declaração. Uma mesma variável pode mudar de tipo ao longo do
   programa.
       Ex: let x = 10;       // number
           x = "Olá";         // agora é string
           x = true;          // agora é boolean
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
5. Em Javascript existe o operador Rest. Explique o que ele é, onde e
   para que ele pode ser utilizado.

R: O operador Rest (três pontos: ...) AGRUPA múltiplos elementos em um
   único array. Ele permite trabalhar com uma quantidade indefinida de
   valores de forma simples.

   ONDE PODE SER UTILIZADO:
   - Em PARÂMETROS de função: junta todos os argumentos extras num array.
   - Em DESESTRUTURAÇÃO: pega "o resto" dos elementos de um array/objeto.

   EXEMPLOS:
     // Em parâmetros de função
     function somar(...numeros) {
       return numeros.reduce((acc, n) => acc + n, 0);
     }
     somar(1, 2, 3, 4); // 10

     // Em desestruturação de array
     const [primeiro, ...resto] = [10, 20, 30, 40];
     // primeiro = 10, resto = [20, 30, 40]

     // Em desestruturação de objeto
     const { nome, ...outrosDados } = { nome: "Ana", idade: 25, cidade: "SP" };
     // nome = "Ana", outrosDados = { idade: 25, cidade: "SP" }
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
6. Compare detalhadamente as declarações let e const. É possível realizar
   a mutação de propriedades em um objeto declarado como const?
   Justifique sua resposta com base nas regras de reatribuição e
   mutabilidade.

R: SEMELHANÇAS: let e const têm escopo de bloco ({}), não sofrem hoisting
   "utilizável" (caem na temporal dead zone) e não podem ser redeclarados
   no mesmo escopo.

   DIFERENÇA PRINCIPAL:
   - let  → permite REATRIBUIÇÃO do valor.
   - const→ NÃO permite reatribuição. A variável precisa ser inicializada
            na declaração e a referência fica fixa.

   MUTAÇÃO EM OBJETOS const: SIM, é possível alterar as propriedades.
   JUSTIFICATIVA: o const trava a REFERÊNCIA (o "endereço" do objeto na
   memória), não o conteúdo. Mutação muda o conteúdo do objeto, mas a
   referência continua a mesma — por isso é permitida. Reatribuir o objeto
   inteiro daria erro porque mudaria a referência.

   EXEMPLO:
     const user = { nome: "Felipe", idade: 22 };
     user.nome = "João";     // ✅ mutação permitida (referência intacta)
     user.idade = 23;         // ✅ mutação permitida
     // user = { nome: "Ana" }; // ❌ TypeError: assignment to constant
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
7. O bloco finally possui um comportamento singular no tratamento de
   erros. Discorra sobre sua obrigatoriedade de execução e forneça um
   exemplo real de "limpeza de recursos" (como fechamento de conexões)
   que deve ocorrer nesse bloco.

R: O bloco 'finally' SEMPRE é executado, independentemente do que
   aconteça no try/catch:
   - Se o try executar sem erro → roda o finally.
   - Se o try lançar um erro e o catch tratar → roda o finally.
   - Se o try lançar erro sem catch → roda o finally e depois propaga o erro.
   - Mesmo se houver 'return' dentro de try ou catch → o finally ainda roda.

   POR QUE ISSO É ÚTIL: garante que recursos sejam liberados, evitando
   vazamentos (memória, conexões abertas, arquivos travados).

   EXEMPLO REAL — fechando conexão de banco de dados:

     async function buscarUsuarios() {
       const conexao = await abrirConexaoBanco();
       try {
         const resultado = await conexao.query("SELECT * FROM users");
         return resultado;
       } catch (erro) {
         console.log("Falha na query:", erro.message);
       } finally {
         await conexao.fechar(); // ✅ SEMPRE fecha, evita conexão vazando
       }
     }

   Outros exemplos: fechar arquivos abertos, esconder loading da tela,
   liberar trava (lock), limpar timers.
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
8. A função forEach é uma ferramenta essencial para iteração. Explique
   como ela funciona tecnicamente, o papel da função de callback nesse
   método e por que ela, ao contrário do map, não retorna um novo array.

R: COMO FUNCIONA: forEach é um método dos arrays que percorre cada
   elemento e executa uma função (callback) para cada um. A cada iteração,
   o callback recebe três argumentos: (elementoAtual, índice, arrayInteiro).

   PAPEL DO CALLBACK: define O QUE fazer com cada elemento — imprimir,
   modificar uma variável externa, chamar outra função, etc. O forEach
   delega ao callback toda a lógica da iteração.

   POR QUE NÃO RETORNA UM NOVO ARRAY:
   - O propósito do forEach é executar EFEITOS COLATERAIS (algo
     externo ao array, como um console.log ou atualização de UI).
   - O propósito do map é TRANSFORMAR dados, então ele coleta os
     retornos do callback e monta um array novo.
   - forEach sempre retorna 'undefined'. Não dá pra encadear (.filter,
     .map) depois dele.

   EXEMPLO:
     const nums = [1, 2, 3];

     nums.forEach(n => console.log(n * 2));  // imprime 2, 4, 6 → retorna undefined

     const dobrados = nums.map(n => n * 2);  // [2, 4, 6] ← novo array
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
9. JavaScript é classificada como uma linguagem de alto nível, leve e
   interpretada. Explique o papel da padronização ECMAScript (especialmente
   a versão ES6) na modernização da linguagem e na interoperabilidade
   entre navegadores.

R: ECMAScript é a ESPECIFICAÇÃO PADRONIZADA da linguagem (mantida pela
   ECMA International, comitê TC39). JavaScript é a IMPLEMENTAÇÃO mais
   famosa dessa especificação. Cada navegador (Chrome, Firefox, Safari,
   Edge) e o Node.js implementam a especificação ECMAScript em suas
   próprias engines (V8, SpiderMonkey, JavaScriptCore, etc).

   PAPEL DA PADRONIZAÇÃO: garantir que o mesmo código JavaScript funcione
   da mesma forma em qualquer ambiente — isso é a INTEROPERABILIDADE.
   Sem o padrão, cada navegador implementaria recursos do seu jeito.

   ES6 (ECMAScript 2015): foi a maior atualização da história da linguagem.
   Trouxe modernizações que mudaram completamente o estilo de escrita:
   - let e const (escopo de bloco)
   - Arrow functions (=>)
   - Classes
   - Template literals (`olá ${nome}`)
   - Destructuring
   - Spread / Rest (...)
   - Promises
   - Módulos (import / export)
   - for...of
   - Default parameters

   Antes do ES6 o JavaScript era considerado verboso e limitado para
   aplicações grandes. Depois dele, virou uma linguagem moderna e
   competitiva para sistemas complexos (frontend e backend).
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
10. O método reduce é frequentemente considerado um dos mais complexos
    para iniciantes. Explique sua lógica de funcionamento, detalhando o
    papel do "acumulador" e como esse método pode transformar uma lista
    de dados em um valor único ou objeto.

R: O reduce REDUZ um array a um único valor (que pode ser número, string,
   objeto, outro array, qualquer coisa). Ele itera o array passando
   por cada elemento e vai acumulando um resultado.

   ASSINATURA: array.reduce((acumulador, atual) => novoAcumulador, valorInicial);

   PAPEL DO ACUMULADOR:
   - É a "memória" da operação — guarda o resultado parcial entre as
     iterações.
   - Em cada passo, o callback recebe o acumulador atual e o item atual,
     e retorna o NOVO valor do acumulador.
   - O segundo argumento do reduce é o valor INICIAL do acumulador.

   EXEMPLOS:

   // 1) Reduzir a um NÚMERO (soma):
   const soma = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0);
   // Iteração 1: acc=0, n=1 → retorna 1
   // Iteração 2: acc=1, n=2 → retorna 3
   // Iteração 3: acc=3, n=3 → retorna 6
   // Iteração 4: acc=6, n=4 → retorna 10
   // Resultado: 10

   // 2) Reduzir a um OBJETO (contar ocorrências):
   const palavras = ["maçã", "uva", "maçã", "pera", "uva", "maçã"];
   const contagem = palavras.reduce((acc, palavra) => {
     acc[palavra] = (acc[palavra] || 0) + 1;
     return acc;
   }, {});
   // contagem = { maçã: 3, uva: 2, pera: 1 }

   // 3) Reduzir a uma STRING:
   const nomes = ["Ana", "Bia", "Caio"];
   const lista = nomes.reduce((acc, nome) => acc + "- " + nome + "\n", "");
   // "- Ana\n- Bia\n- Caio\n"
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
11. Discorra sobre as vantagens práticas das Arrow Functions (=>) em
    relação às funções tradicionais. Além da sintaxe concisa, mencione
    em que situações elas simplificam a escrita de funções anônimas em
    callbacks.

R: VANTAGENS DAS ARROW FUNCTIONS:

   1) SINTAXE CURTA: ótima para funções pequenas e callbacks.
      const dobro = n => n * 2;     // vs. function(n){ return n*2; }

   2) RETURN IMPLÍCITO: quando o corpo é uma única expressão, não precisa
      de 'return' nem de chaves.
      [1,2,3].map(n => n * 2);

   3) NÃO TEM 'this' PRÓPRIO: a arrow function herda o 'this' do contexto
      onde foi criada (lexical this). Isso resolve o problema clássico do
      'this' bagunçado em callbacks dentro de métodos.

      // Sem arrow (PROBLEMÁTICO):
      function Timer() {
        this.segundos = 0;
        setInterval(function() {
          this.segundos++;          // ❌ 'this' aqui não é o Timer
        }, 1000);
      }

      // Com arrow (FUNCIONA):
      function Timer() {
        this.segundos = 0;
        setInterval(() => {
          this.segundos++;          // ✅ 'this' herdado, refere ao Timer
        }, 1000);
      }

   4) NÃO TEM 'arguments' PRÓPRIO: usa-se Rest (...args) no lugar.

   QUANDO SIMPLIFICAM CALLBACKS:
   - Métodos de array (map, filter, reduce, forEach):
       arr.filter(x => x > 10).map(x => x * 2);
   - Callbacks de eventos curtos:
       botao.addEventListener("click", () => console.log("Clicou!"));
   - Then de Promises:
       fetch(url).then(r => r.json()).then(d => console.log(d));

   QUANDO NÃO USAR: em métodos de objeto que precisem do 'this' do próprio
   objeto, ou em construtores (arrow não pode ser usada com 'new').
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
12. Explique a diferença fundamental entre os operadores de comparação
    == (igualdade de valor) e === (igualdade estrita). Forneça um exemplo
    de comparação que retorne true com o primeiro operador e false com
    o segundo.

R: == (IGUALDADE COM COERÇÃO):
   Compara apenas o VALOR. Se os tipos forem diferentes, JavaScript
   converte um para o outro automaticamente antes de comparar.

   === (IGUALDADE ESTRITA):
   Compara VALOR E TIPO. Se os tipos forem diferentes, retorna false
   imediatamente, sem conversão.

   BOA PRÁTICA: sempre prefira === — evita bugs sutis causados por
   coerção inesperada.

   EXEMPLO QUE DIFERENCIA OS DOIS:
     "5"  ==  5    // true   ← string "5" convertida para number 5
     "5"  === 5    // false  ← tipos diferentes (string vs number)

     0    ==  false   // true
     0    === false   // false

     null ==  undefined   // true
     null === undefined   // false

     []   ==  false   // true   (coerção bizarra!)
     []   === false   // false
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
13. Descreva o ciclo de vida de uma Promise, explicando detalhadamente
    seus três estados (pendente, cumprida e rejeitada). Como o
    desenvolvedor utiliza os métodos resolve e reject para controlar o
    fluxo da operação?

R: Uma Promise é um objeto que representa o resultado FUTURO de uma
   operação assíncrona. Ela passa por exatamente UM dos seguintes ciclos:

   ESTADOS:
   1) PENDENTE (pending): estado inicial. A operação ainda não terminou.
   2) CUMPRIDA (fulfilled / resolved): a operação terminou com sucesso.
      Tem um valor associado (passado por resolve).
   3) REJEITADA (rejected): a operação falhou. Tem um motivo associado
      (passado por reject).

   IMPORTANTE: uma vez que sai de "pendente", a Promise é IMUTÁVEL.
   Não volta atrás, não muda de estado de novo.

   resolve E reject:
   - resolve(valor): chamado pelo desenvolvedor quando a operação
     deu certo. Move a Promise para "cumprida". O valor passado fica
     disponível no .then() ou no await.
   - reject(motivo): chamado quando algo deu errado. Move a Promise
     para "rejeitada". O motivo (geralmente um Error) é capturado em
     .catch() ou em try/catch com await.

   EXEMPLO:
     function login(usuario, senha) {
       return new Promise((resolve, reject) => {
         setTimeout(() => {
           if (senha === "1234") {
             resolve({ id: 1, nome: usuario });   // sucesso → fulfilled
           } else {
             reject(new Error("Senha incorreta"));// falha   → rejected
           }
         }, 1000);
       });
     }

     login("felipe", "1234")
       .then(user => console.log("Logado:", user.nome))
       .catch(err => console.log("Erro:", err.message));

     // Equivalente com async/await:
     try {
       const user = await login("felipe", "1234");
       console.log("Logado:", user.nome);
     } catch (err) {
       console.log("Erro:", err.message);
     }
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
14. O uso do parâmetro Rest (...args) substituiu padrões antigos de
    manipulação de múltiplos argumentos. Explique como ele transforma
    os argumentos recebidos em um array e crie um exemplo de função
    que soma infinitos números usando essa técnica.

R: ANTES DO ES6: para receber uma quantidade indefinida de argumentos,
   usava-se o objeto especial 'arguments' — que parecia um array, mas
   não era um array de verdade (não tinha .map, .filter, .reduce).

       function somaAntiga() {
         let total = 0;
         for (let i = 0; i < arguments.length; i++) {
           total += arguments[i];
         }
         return total;
       }

   COM REST PARAMETER (...args): os argumentos extras são empacotados
   em um ARRAY DE VERDADE — pode usar todos os métodos de array.
   Mais limpo, mais expressivo e funciona com arrow functions
   (que não têm 'arguments').

   EXEMPLO — soma infinita:

     function somar(...numeros) {
       return numeros.reduce((acc, n) => acc + n, 0);
     }

     somar(1, 2, 3);              // 6
     somar(10, 20, 30, 40, 50);   // 150
     somar();                      // 0

   REGRAS:
   - Só pode haver UM parâmetro rest e ele DEVE ser o último:
       function f(a, b, ...resto) { ... }   // ✅
       function f(...resto, a) { ... }      // ❌ erro
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
15. Compare as estruturas while e do-while. Apresente um cenário prático
    de lógica de programação onde o uso do do-while seria obrigatoriamente
    preferível ao while tradicional.

R: while:
   - TESTA a condição ANTES de executar o bloco.
   - Se a condição já for falsa na primeira verificação, o bloco
     NÃO executa nem uma vez.

       while (condicao) {
         // executa enquanto condicao for true
       }

   do-while:
   - EXECUTA o bloco PRIMEIRO e só depois testa a condição.
   - Garante que o bloco roda PELO MENOS UMA VEZ, mesmo que a
     condição já comece falsa.

       do {
         // executa pelo menos 1 vez
       } while (condicao);

   CENÁRIO ONDE do-while É OBRIGATÓRIO — menu interativo:
   Você precisa mostrar o menu pelo menos uma vez antes de saber se
   o usuário quer sair. Com while, você teria que duplicar código.

     let opcao;
     do {
       opcao = prompt("Menu:\n1) Cadastrar\n2) Listar\n0) Sair");
       switch (opcao) {
         case "1": cadastrar(); break;
         case "2": listar();    break;
       }
     } while (opcao !== "0");

   Outros cenários típicos:
   - Validação de input (peço dado → valido → se inválido peço de novo).
   - Jogos (mostro tela inicial pelo menos uma vez antes de checar saída).
   - Pedir confirmação de senha até que coincida.
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
16. A estrutura switch é uma alternativa elegante ao uso excessivo de
    if-else if. Explique em que contextos o switch melhora a legibilidade
    do código e qual o risco de omitir a palavra-chave break.

R: QUANDO O SWITCH É MELHOR QUE if-else if:
   - Quando você compara UMA mesma variável/expressão contra VÁRIOS
     valores possíveis (igualdade estrita).
   - Quando há muitas opções (3+), o if-else if vira "escada" e fica
     ruim de ler.
   - Quando os valores são discretos (números, strings, enums).

   QUANDO NÃO USAR: comparações com intervalos (idade > 18 && idade < 65)
   ou múltiplas condições combinadas — para isso, if-else é mais natural.

   EXEMPLO LEGÍVEL:
     switch (diaSemana) {
       case "segunda":
       case "terça":
       case "quarta":
       case "quinta":
       case "sexta":
         console.log("Dia útil");
         break;
       case "sábado":
       case "domingo":
         console.log("Fim de semana");
         break;
       default:
         console.log("Dia inválido");
     }

   RISCO DE OMITIR O break — FALL-THROUGH:
   Sem break, a execução "vaza" para o próximo case mesmo que o valor
   não bata. É um bug clássico, difícil de notar.

     const nota = "B";
     switch (nota) {
       case "A": console.log("Excelente");   // sem break
       case "B": console.log("Bom");         // sem break ← entra aqui
       case "C": console.log("Regular");     // sem break ← e aqui também!
       default:  console.log("Avaliado");
     }
     // Saída: "Bom", "Regular", "Avaliado"   ← bug!

   ÚNICO USO INTENCIONAL DE FALL-THROUGH: agrupar cases com mesmo
   comportamento (como no exemplo dos dias da semana acima — segunda
   até sexta caem no mesmo console.log).
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
17. O comando throw permite ao desenvolvedor "lançar" exceções. Explique
    como essa prática auxilia na criação de regras de negócio
    personalizadas e como esses erros podem ser capturados por um bloco
    catch externo.

R: throw "lança" um erro manualmente. Pode lançar qualquer valor, mas o
   recomendado é lançar um objeto Error (ou subclasse), que carrega
   mensagem e stack trace.

   PAPEL EM REGRAS DE NEGÓCIO:
   Permite interromper a execução assim que uma condição inválida é
   detectada, sinalizando claramente o problema. Em vez de retornar
   códigos de erro espalhados (boolean, null, -1) e ter que testar tudo
   manualmente, o throw "pula" direto para o catch mais próximo.

   PROPAGAÇÃO: quando um erro é lançado, ele "sobe" pela pilha de chamadas
   até encontrar um catch. Se não houver catch em lugar nenhum, o programa
   quebra com erro não tratado.

   EXEMPLO — regras de negócio numa transferência bancária:

     function transferir(origem, destino, valor) {
       if (valor <= 0) {
         throw new Error("Valor deve ser positivo");
       }
       if (origem.saldo < valor) {
         throw new Error("Saldo insuficiente");
       }
       if (origem === destino) {
         throw new Error("Conta de origem e destino são iguais");
       }
       origem.saldo -= valor;
       destino.saldo += valor;
     }

     // O catch externo captura QUALQUER erro lançado pela função:
     try {
       transferir(contaA, contaB, -100);  // throw "Valor deve ser positivo"
     } catch (erro) {
       console.log("Falha na transferência:", erro.message);
     }

   ERROS PERSONALIZADOS (avançado): pode-se criar classes próprias
   estendendo Error, ex: class SaldoInsuficienteError extends Error {...}
   permitindo tratar tipos específicos de erro de formas diferentes.
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
18. Defina o conceito de "Escopo de Bloco" introduzido no JavaScript
    moderno. O que acontece com o fluxo do programa se tentarmos acessar
    uma variável declarada com let dentro de um if após o fechamento de
    suas chaves {}?

R: ESCOPO DE BLOCO: introduzido no ES6 com let e const. Significa que
   variáveis declaradas dentro de um par de chaves { } só existem
   DENTRO dessas chaves. Fora delas, a variável simplesmente não existe.

   Blocos onde isso vale: if, else, for, while, switch, try/catch, ou
   um { } isolado.

   ANTES DO ES6: var não tinha escopo de bloco — só escopo de função.
   Variáveis var declaradas dentro de um if "vazavam" para fora.

   O QUE ACONTECE AO ACESSAR FORA DO BLOCO:
   Lança um ReferenceError em tempo de execução — o programa para de
   executar (a menos que esteja dentro de try/catch).

   EXEMPLO:
     if (true) {
       let mensagem = "Olá";
       var antiga    = "Tchau";
     }

     console.log(antiga);    // "Tchau"   ← var vaza, funciona
     console.log(mensagem);  // ❌ ReferenceError: mensagem is not defined

   POR QUE ISSO É BOM:
   - Evita poluição do escopo (variáveis "vazando" pra onde não deviam).
   - Reduz bugs em loops (cada iteração tem sua própria variável).
   - Torna o código mais previsível e legível.

   EXEMPLO CLÁSSICO COM for:
     for (let i = 0; i < 3; i++) { // i só existe dentro deste bloco
       // ...
     }
     console.log(i); // ❌ ReferenceError com let
                     // Com var, imprimiria 3 (i vazou)
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
19. O que caracteriza uma Higher-Order Function (Função de Alta Ordem)?
    Explique como a capacidade de uma função retornar outra função
    permite a criação de lógicas configuráveis, como um gerador de
    multiplicadores.

R: Uma HIGHER-ORDER FUNCTION (Função de Alta Ordem) é toda função que
   atende a PELO MENOS UMA dessas duas condições:
   1) RECEBE uma função como argumento.
   2) RETORNA uma função como resultado.

   Em JavaScript, funções são "cidadãos de primeira classe" — podem ser
   passadas, retornadas e atribuídas a variáveis como qualquer valor.

   EXEMPLOS QUE RECEBEM FUNÇÃO (callbacks):
     [1, 2, 3].map(n => n * 2);                 // map recebe função
     setTimeout(() => alert("oi"), 1000);       // setTimeout recebe função
     botao.addEventListener("click", handler);  // recebe handler

   EXEMPLOS QUE RETORNAM FUNÇÃO (lógica configurável / fábricas):

   // GERADOR DE MULTIPLICADORES — clássico de prova:
   function criarMultiplicador(fator) {
     return function(numero) {
       return numero * fator;        // closure: lembra do 'fator'
     };
   }

   const dobrar    = criarMultiplicador(2);
   const triplicar = criarMultiplicador(3);
   const quintuplicar = criarMultiplicador(5);

   dobrar(10);       // 20
   triplicar(10);    // 30
   quintuplicar(10); // 50

   POR QUE ISSO É PODEROSO:
   - Em vez de escrever 3 funções diferentes (dobrar, triplicar...),
     criamos UMA fábrica que gera funções configuradas.
   - Reduz repetição de código.
   - Permite criar funções "sob medida" em tempo de execução.
   - É a base de padrões avançados: currying, decorators, middleware
     (Express), HOCs (React).

   OBS: o gerador de multiplicadores funciona graças à CLOSURE — a
   função interna "lembra" do 'fator' mesmo depois de criarMultiplicador
   ter terminado.
--------------------------------------------------------------------- */


/* ---------------------------------------------------------------------
20. No desenvolvimento de aplicações que dependem de múltiplas APIs,
    o uso sequencial de await pode ser ineficiente. Explique o conceito
    de execução paralela e como o método Promise.all() otimiza o tempo
    total de resposta da aplicação.

R: PROBLEMA DO await SEQUENCIAL:
   Quando você usa vários awaits em sequência, cada chamada SÓ COMEÇA
   depois que a anterior termina — mesmo que sejam independentes entre si.
   O tempo total = soma de todos os tempos.

     // Sequencial — LENTO (3 segundos)
     async function carregarDados() {
       const usuario  = await fetchUsuario();   // 1s
       const posts    = await fetchPosts();     // 1s
       const noticias = await fetchNoticias();  // 1s
       return { usuario, posts, noticias };
     }

   EXECUÇÃO PARALELA:
   Como JavaScript é assíncrono, podemos DISPARAR as três promises
   ao mesmo tempo (sem await) e depois esperar todas terminarem juntas.
   O tempo total = tempo da MAIS LENTA (não da soma).

   Promise.all(arrayDePromises): recebe um array de Promises, dispara
   todas em paralelo e retorna UMA única Promise que:
   - Resolve com um array de resultados (na mesma ordem) quando TODAS
     terminarem com sucesso.
   - Rejeita imediatamente se QUALQUER uma falhar (fail-fast).

     // Paralelo com Promise.all — RÁPIDO (1 segundo)
     async function carregarDados() {
       const [usuario, posts, noticias] = await Promise.all([
         fetchUsuario(),
         fetchPosts(),
         fetchNoticias()
       ]);
       return { usuario, posts, noticias };
     }

   GANHO REAL: se cada API leva 1s e você tem 3 chamadas independentes,
   o sequencial leva 3s e o paralelo leva 1s — 3x mais rápido.

   QUANDO USAR Promise.all:
   - Chamadas INDEPENDENTES entre si (uma não depende do resultado da outra).

   QUANDO NÃO USAR (e manter sequencial):
   - Quando uma chamada depende do resultado da anterior.
     Ex: pegar o ID do usuário primeiro, depois buscar os posts dele.

   ALTERNATIVAS:
   - Promise.allSettled(): espera todas, MESMO se algumas falharem
     (não é fail-fast). Útil quando uma falha não deve cancelar as outras.
   - Promise.race(): retorna a primeira que terminar (sucesso ou erro).
   - Promise.any(): retorna a primeira que tiver SUCESSO.
--------------------------------------------------------------------- */
