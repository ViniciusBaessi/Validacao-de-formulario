const campos = document.querySelectorAll("[required]")

const spans = document.querySelectorAll('.span-required')

const checkbox = document.querySelectorAll('#checkbox')

const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const form = document.querySelector('#form')
const button = document.querySelector('.enviar')




//Ao clicar no botão enviar, todas as validações serão feitas ao mesmo tempo, através de um ouvinte de eventos no (form)
button.addEventListener('click', function(event) {
    event.preventDefault();


    console.log('Botão clicado!');

    validanome () 
    validaemail ()
    validaCPF ()
    
    validacheck () 

    


  });




//Aplica a estilização caso o critério não seja atendido

function aplicaErro(index) {
    campos[index].style.border = '2px solid #e63636'
    spans[index].style.display = 'block'
}



//remove a estilização caso o critério seja atendido

function removeErro (index) {
    campos[index].style.border = ''
    spans[index].style.display = 'none'
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






function validaCPF () {

    console.clear()




    //Pega os valores digitados no campo CPF e remove os carcteres especiais (\, ., -), após esse tratamento, o dado é armazenado na variável CPF
    
    const cpf = campos[3].value.replace(/\.|-/g, "")
    console.log(cpf)


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

    console.log(`Esse é o primeiro digito validado ${soma}`)
    

    //Se último digito do for diferente de soma retorna TRUE, se não retorna FALSE
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

    console.log(`Esse é o segundo digito validado ${soma}`)

    
    return soma != cpf[10];
 
}

function validacheck () {

    if(!checkbox[0].checked) {
        aplicaErro(5);
        console.log('Não foi preenchido')
    } else {
        removeErro(5);
        console.log('Preenchido')
    }

}