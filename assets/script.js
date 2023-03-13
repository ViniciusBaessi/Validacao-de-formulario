const campos = document.querySelectorAll("[required]")

const spans = document.querySelectorAll('.span-required')

const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const form = document.querySelector('.form')




form.addEventListener('submit', (event) => {
    event.preventDefault();
    validanome ();
    validaemail ();
    console.log('erro')
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