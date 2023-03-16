const campos = document.querySelectorAll("[required]")

const spans = document.querySelectorAll('.span-required')

const checkbox = document.querySelectorAll('#checkbox')

const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const form = document.querySelector('#form')
const button = document.querySelector('.enviar')

let erro





//Ao clicar no botão enviar, todas as validações serão feitas ao mesmo tempo, através de um ouvinte de eventos (click)
button.addEventListener('click', function(event) {
    event.preventDefault();

    

    //Validações
    validanome () 
    validaemail ()
    validarg ()
    validaCPF ()
    validaIdade ()
    validacheck () 

    
    //Objeto que receberá os dados
    const usuario = { 
        nome: `${campos[0].value}`, 
        email: `${campos[1].value}`, 
        RG: `${campos[2].value}`, 
        CPF: `${campos[3].value}`, 
        Nascimento: `${campos[4].value}` 
    };


    // Os dados serão enviados apenas na ausência de erros
    if (erro == "sem erro") {

        //Armazenando o objeto junto com os dados para o localstorage
        localStorage.setItem("Cadastro", JSON.stringify(usuario))


            //
        campos[0].value = ""
        campos[1].value = ""
        campos[2].value = ""
        campos[3].value = ""
        campos[4].value = ""

        
                
    }
    console.log(erro)
   
  });



  


 

  



//Aplica a estilização caso o critério não seja atendido

function aplicaErro(index) {
    campos[index].style.border = '2px solid #e63636'
    spans[index].style.display = 'block'
    erro = "Existem erros, verifique"
}



//remove a estilização caso o critério seja atendido

function removeErro (index) {
    campos[index].style.border = ''
    spans[index].style.display = 'none'
    erro = "sem erro"
}


// Se a quantidade de caracteres em (nome) for menor do que 3 o código aciona a função que habilita o span do HTML, pinta e pinta a borda de vermelho. ('O span é a mensagem de erro definida no HTML'). Do contrário, o erro é removido, bem com as suas características.

function validanome () {
    if (campos[0].value.length < 3 ) {
        aplicaErro(0)
    } else {
        removeErro (0)
    }
}

//Aplica uma validação com base no REGEX criado para o email e retorna um erro caso o dado não esteja em conformidade
function validaemail () {
    if(!emailRegex.test(campos[1].value)){
        aplicaErro(1)
    } else {
        removeErro(1)
    }
}


//Remove os caracteres (-) (/) (.) caso o usuário digite e armazena somente os números. Se a quantidade de números for maior ou menor que 9. Aparece um erro na tela. O RG tem especificamente 9 dígitos.
function validarg () {

    const rg = campos[2].value.replace(/\.|-|\//g, "")

   if (rg.length < 9 || rg.length > 9 ) {

        aplicaErro(2)
    } else {
        removeErro(2)
    }
    
    
}


function validaCPF () {


    //Pega os valores digitados no campo CPF e remove os carcteres especiais (\, ., -), após esse tratamento, o dado é armazenado na variável CPF
    
    const cpf = campos[3].value.replace(/\.|-/g, "")
    

    digito1(cpf)
    digito2(cpf)


    if (digito1(cpf) || digito2(cpf)) {
        aplicaErro(3)
    } else {
        removeErro (3)
    }
    
   
}



function digito1(cpf) {
    
    

    let soma = 0;
    let multiplicador = 10;


    /*Fazendo a multiplicação dos 9 primeiros digitos do CPF, exemplo


    CPF: 123. 456. 789
    Multiplicador : 10, 9, 8, 7, 6, 5, 4, 3, 2
    
    Multiplicação (1x10) (2x9) (3x8) (4x7) ... (9x2)


    E por fim somando o resultado de todas as multiplicações

    */


    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }


    //Multiplicando o resultado da soma por 10 e pegando o resto da sua duvisão por 11, por fim o valor será armazenado na variável (soma)
    soma = (soma * 10) % 11;

    //Se o resto da divisão for igual a 10 ou 11, o valor da variável soma seria 0

    if (soma == 10 || soma == 11) {
        soma = 0;
    }


    //Se último digito do CPF for diferente de soma, retorna TRUE, se não retorna FALSE
    return soma != cpf[9];
    
}


function digito2(cpf) {

    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;


    if (soma == 10 || soma == 11) {
        soma = 0;
    }


    
    return soma != cpf[10];
 
}



function validaIdade () {

    //Pega a data inserida pelo usuário e adiciona mais um dia pois o navegador estava dando problemas com o fuso-horário
    const datanasc = new Date(campos[4].value)
    datanasc.setDate(datanasc.getDate() + 1);

    //Pega a data atual
    const dataatual = new Date()


    //Soma 18 anos em cima da data atual
    const dataMais18 = new Date(datanasc.getUTCFullYear() + 18, datanasc.getUTCMonth(), datanasc.getUTCDate() - 1);

    
    //Se a data atual for igual ou menor que a data somada por 18. Aparece um erro. Em outras palavras, se o usuário for de menor, não poderá acessar a plataforma.
    if (dataatual <= dataMais18) {
        aplicaErro(4) 
    } else {
        removeErro(4) 
    }

}



function validacheck () {

    //Se o checkbox não for preenchido, aparece um erro na tela
    if(!checkbox[0].checked) {
        aplicaErro(5);
    } else {
        removeErro(5);
    }

}