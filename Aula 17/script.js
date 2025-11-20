// começo criando uma função só pra testar como os arrays funcionam.
// É basicamente eu mexendo numa lista de compras mesmo.

function manipularArrays() {
  // Começando minha lista normal
  let listaDeCompras = ["Arroz", "Feijão", "Macarrão", "Leite", "Café"];

  // adiciononando + um item, como se lembrasse na hora "ah, faltou isso!"
  listaDeCompras.push("Açúcar");

  // Removendo o primeiro item 
  listaDeCompras.shift();

  // Aqui eu quero só os itens com nome grande, então uso filter
  let itensGrandes = listaDeCompras.filter(item => item.length > 5);

  // texto pra aparecer na tela
  let resultado = `
Lista original: ["Arroz", "Feijão", "Macarrão", "Leite", "Café"]

Depois de adicionar e remover itens:
${JSON.stringify(listaDeCompras)}

Itens que têm mais de 5 letras:
${JSON.stringify(itensGrandes)}
  `;

  document.getElementById("resultadoArrays").innerText = resultado;
}

// parte das strings
// Fiz igual: peguei uma frase qualquer e fui alterando ela

function manipularStrings() {
  // Peguei a frase com uns espaços a mais só pra testar o trim()
  let frase = " JavaScript é uma linguagem poderosa! ";

  // Removendo os espaços das pontas
  let fraseSemEspacos = frase.trim();

  // Dividindo a frase em palavras
  let palavras = fraseSemEspacos.split(" ");

  let resultado = `
Frase original:
"${frase}"

Depois do trim():
"${fraseSemEspacos}"

Convertida em array:
${JSON.stringify(palavras)}
  `;

  document.getElementById("resultadoStrings").innerText = resultado;
}
