/*
1. Comparação de declarações:
Explique, com suas palavras, as diferenças entre var, let e const e crie exemplos que
demonstrem suas particularidades (hoisting, escopo de bloco vs. função)
R: - var, let e const são formas de declarar variaveis.
- var e let podem mudar de valor, const não.
- let e const tem escopo de bloco {}, var tem escopo de função vaza do bloco.
- const trava a variavel, mas o conteudo de objetos/arrays ainda pode mudar.
HOISTING
- var sobe e vira undefined.
- let e const sobem mas ficam na "zona morta" (dão erro se são usadas antes).
- function sobe inteira (pode ser chamada antes).
EXEMPLO
//Escopo
function teste(){
if (true) {var a = 1; let b = 2; }
  console.log(a); //1
  console.log(b); //ReferenceError
}
//Hoisting
console.log(x); //undefined
var x = 5;

console.log(y); //ReferenceError
let y = 5;

2. Hoisting com var:
Dado o código abaixo, qual será a saída? Explique o papel do hoisting nesse contexto.
javascript
Copy
console.log(a);
var a = 10;
R: A saída sera undefined, por que o valor foi atribuido após a impressão da variavel.

3. Temporal Dead Zone:
Analise o código a seguir e explique por que ocorre um erro. Proponha uma correção.
javascript
Copy
function test() {
console.log(x);
let x = 5;
}
test();
R:A resposta dara erro por que a variavel let foi atribuida valor após a impressão da mesma, para que a função funcione corretamente, o ideia é declarar antes de usar:
function test() {
let x = 5;
console.log(x);
}
test();

4. Escopo Global vs. Local:
Crie uma função que modifique uma variável definida no escopo global e explique como
essa modificação afeta o restante do código.
R: var x = 0;
console.log(x);
function mudarVariavel(){
x = 10;
}
mudarVariavel();
console.log(x);
A função que eu defini ela consegue sempre que necessário alterar o valor da variavel x que podera ser passado qualquer valor via parametro, por que ela foi definida em escopo global, trazendo desssa forma mais flexibilidade para o código caso seja necessário efetuar essa troca de valor.

5. Escopo de Bloco vs. Escopo de Função:
Desenvolva um exemplo que declare variáveis tanto no escopo de bloco quanto no
escopo de função, demonstrando como elas são acessadas ou restritas.
6. Closures e Escopo Léxico:
Implemente uma função que utiliza closure para criar um contador privado. Explique
como o escopo léxico possibilita esse comportamento.
7. Sombreamento de Variáveis (Shadowing):
Escreva um exemplo onde uma variável definida no escopo externo é "sombreada" por
outra com o mesmo nome no escopo interno. Descreva o impacto sobre os valores
utilizados.
8. Loop e Declaração de Índice:
Compare a utilização de var e let em um loop for para declarar a variável do índice,
explicando as diferenças de comportamento.
9. Hoisting em Diferentes Declarações:
Explique o conceito de hoisting e ilustre como ele funciona para declarações
com var, let e const por meio de exemplos.
10. Exercício Prático de Escopo com var:
Analise o seguinte código e determine os valores impressos, justificando o
comportamento do hoisting:
javascript
Copy
var a = 1;
function foo() {
a = 2;
if (true) {
var a = 3;
console.log(a);
}
console.log(a);
}
foo();
console.log(a);
11. Imutabilidade de const com Objetos:
Crie um exemplo que demonstre como a declaração const impede a reatribuição, mas
permite a mutação interna em objetos. Explique as implicações.
12. Linguagens Compiladas vs. Interpretadas – Conceitos:
Explique, com suas palavras, o que significa uma linguagem ser compilada versus
interpretada. Ilustre com exemplos (como C para compilada e JavaScript para
interpretada).
13. Vantagens e Desvantagens:
Discuta as vantagens e desvantagens de linguagens compiladas e interpretadas, utilizando
exemplos reais para embasar sua análise.
14. Execução de JavaScript no Navegador:
Explique como o JavaScript é executado nos navegadores modernos, abordando o papel
do interpretador e/ou compilação just-in-time (JIT).
15. Simulação de Cadeia de Escopo:
Crie um exemplo de código com funções aninhadas que ilustre a cadeia de escopo (scope
chain). Explique como o JavaScript resolve as referências de variáveis.
16. Persistência de Variáveis Externas:
Dado um código com funções aninhadas, explique como o ambiente de execução
preserva as variáveis do escopo externo mesmo após o término da função externa.
17. Lexical vs. Dinâmico:
Elabore um código que ilustre a diferença entre escopo léxico e escopo dinâmico, e
discuta por que o JavaScript adota o escopo léxico.
18. Temporal Dead Zone – Exemplo Prático:
Forneça um exemplo que demonstre a "temporal dead zone" ao utilizar let ou const e
explique como evitá-la.
19. Exercício de Shadowing com var:
Analise o código abaixo e explique a saída, considerando a criação de uma nova variável
com mesmo nome no escopo interno:
javascript
Copy
var x = 10;
function outer() {
console.log(x);
var x = 20;
function inner() {
console.log(x);
}
inner();
}
outer();
20. Just-in-Time Compilation (JIT):
Discuta como a otimização por meio do compilador just-in-time (JIT) influencia a
performance do JavaScript em ambientes modernos, dando exemplos práticos ou
teóricos.
*/