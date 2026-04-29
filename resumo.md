# Resumão JavaScript — Tópicos Especiais de Sistemas

> Cheat sheet por tema. Use como visão geral antes de aprofundar nas respostas.

---

## 1. Variáveis, Tipagem e Escopo

| Conceito | Resumo | Exemplo rápido |
|---|---|---|
| **Tipagem fraca** | A linguagem converte tipos automaticamente (coerção). | `"5" + 1` → `"51"` |
| **Tipagem dinâmica** | O tipo é definido em tempo de execução e pode mudar. | `let x = 1; x = "oi";` |
| **`var`** | Escopo de função. Hoisting com `undefined`. Pode ser redeclarada. | (evite usar) |
| **`let`** | Escopo de bloco `{}`. Reatribuível. | `let i = 0; i = 1;` |
| **`const`** | Escopo de bloco. **Não** reatribuível. | `const PI = 3.14;` |
| **Escopo de bloco** | `let`/`const` só vivem dentro do `{}` onde foram criadas. | `if(true){ let a=1 } a // erro` |

**Pegadinha do `const`:** você não pode trocar a referência, mas **pode mutar** propriedades de objeto/array.
```js
const user = { nome: "Felipe" };
user.nome = "João";   // ✅ mutação ok
user = {};            // ❌ TypeError
```

---

## 2. Operadores Importantes

| Operador | O que faz | Exemplo |
|---|---|---|
| `==` | Igualdade com **coerção** de tipo. | `"5" == 5` → `true` |
| `===` | Igualdade **estrita** (valor + tipo). | `"5" === 5` → `false` |
| `...` (Rest) | **Agrupa** itens em array. | `function f(...nums)` |
| `...` (Spread) | **Espalha** array/objeto em itens. | `[...a, ...b]` |

> `...` é o mesmo símbolo, mas o papel muda pelo contexto: se está **recebendo** → Rest; se está **espalhando** → Spread.

---

## 3. Funções

| Conceito | Resumo |
|---|---|
| **Arrow function** | `(a,b) => a+b`. Sintaxe curta. **Não tem `this` próprio** (herda do contexto). |
| **Higher-Order Function** | Função que **recebe** ou **retorna** outra função. Ex: `map`, `filter`, gerador de funções. |
| **Closure** | Função que "lembra" do escopo onde foi criada, mesmo depois dele terminar. Permite estado privado. |
| **Rest `(...args)`** | Junta argumentos extras num array. Substitui o antigo `arguments`. |

```js
// Closure: contador com estado privado
const contador = (() => {
  let n = 0;
  return () => ++n;
})();
contador(); // 1
contador(); // 2
```

---

## 4. Iteração e Estruturas de Controle

| Estrutura | Quando usar | Retorna? |
|---|---|---|
| `for` | Iteração com índice. | — |
| `while` | Testa antes de executar. | — |
| `do-while` | Executa **pelo menos 1 vez**, testa depois. | — |
| `forEach` | Efeitos colaterais (ex: imprimir). | `undefined` |
| `map` | Transformar cada item. | **Novo array** |
| `filter` | Filtrar itens. | Novo array |
| `reduce` | Reduzir array a 1 valor (soma, objeto, etc). | Valor final |
| `switch` | Comparar 1 variável com vários valores. | — (cuidado com **fall-through** sem `break`) |

```js
// reduce: soma de array
[1, 2, 3, 4].reduce((acc, atual) => acc + atual, 0); // 10
//                  ^acumulador ^item     ^valor inicial
```

---

## 5. Tratamento de Erros

```
try    → bloco que PODE dar erro
catch  → captura e trata o erro
finally→ SEMPRE executa (com ou sem erro) — limpeza
throw  → lança erro manualmente (regras de negócio)
```

```js
try {
  if (idade < 18) throw new Error("Menor de idade");
} catch (e) {
  console.log(e.message);
} finally {
  conexao.fechar(); // garante limpeza
}
```

---

## 6. Assincronismo

| Conceito | Resumo |
|---|---|
| **Promise** | Objeto que representa operação futura. 3 estados: `pending` → `fulfilled` (resolve) **ou** `rejected` (reject). |
| **`async`** | Marca função como assíncrona — sempre retorna uma Promise. |
| **`await`** | Pausa a função até a Promise resolver. Só funciona dentro de `async`. |
| **`Promise.all([...])`** | Executa **em paralelo**, espera todas. Se uma falhar, falha tudo. |

```js
// Sequencial (lento): 2s
const a = await fetchA(); // 1s
const b = await fetchB(); // 1s

// Paralelo (rápido): 1s
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

---

## 7. ECMAScript / ES6

- **ECMAScript** = especificação padronizada que o JavaScript implementa.
- **ES6 (2015)** trouxe modernização massiva: `let`/`const`, arrow functions, classes, template literals, destructuring, módulos, `Promise`, spread/rest, `for...of`.
- Garante **interoperabilidade**: o mesmo código funciona em Chrome, Firefox, Safari, Edge, Node.js.

---

## Mapa mental rápido

```
JAVASCRIPT
│
├── Variáveis ── var / let / const ── escopo de bloco
│
├── Tipagem ── fraca (coerção) + dinâmica (muda em runtime)
│
├── Funções
│   ├── Arrow (sem this próprio)
│   ├── Higher-Order (recebe/retorna função)
│   └── Closure (mochila de escopo)
│
├── Operadores
│   ├── == vs === (coerção vs estrita)
│   └── ... (Rest agrupa / Spread espalha)
│
├── Iteração ── for / while / do-while / forEach / map / reduce / switch
│
├── Erros ── try / catch / finally / throw
│
└── Async ── Promise (pending→fulfilled/rejected) / async-await / Promise.all
```
