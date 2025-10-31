let nota = 65;
if (nota>=70){
    console.log("Aprovado");
}else if (nota>= 50 && nota < 70){
    console.log ("Recuperação");
}else{
    console.log("Reprovado"); 
}
let mes = 4;
switch (mes){
    case 1:
        console.log ("Janeiro");
        break;
    case 2:
        console.log ("Fevereiro");
        break;
    case 3: 
        console.log ("Março");
        break;
    
    case 4: 
        console.log ("Abril");
        break;

    case 5: 
        console.log ("Maio");
        break;
    
    case 6: 
        console.log ("Junho");
        break;
    
    case 7: 
        console.log ("Julho");
        break;

    
    case 8: 
        console.log ("Agosto");
        break;
    
    case 9: 
        console.log ("Setembro");
        break;

    
    case 10: 
        console.log ("Outubro");
        break;
    
    case 11: 
        console.log ("Novembro");
        break;
    
    case 12: 
        console.log ("Dezembro");
        break;
    defalt:
        console.log ("Mês inválido"); 

        let i = 0;
while (i <= 20) {
    if (i % 2 === 0) {
        console.log(i);
    }
    i++;
}


let cidades = ["Curitiba", "São Paulo", "Recife", "Belo Horizonte", "Salvador"];
for (let i = 0; i < cidades.length; i++) {
    console.log(cidades[i]);
}


for (let i = 10; i >= 1; i--) {
    console.log(i);
}
}