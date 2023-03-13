const campos = document.querySelectorAll("[required]")
console.log(campos)

const spans = document.querySelectorAll('.span-required')

const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


function aplicaErro(index) {
    campos[index].style.border = '2px solid #e63636'
    spans[index].style.display = 'block'
}

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


function validaemail () {
    if(!emailRegex.test(campos[1].value)){
        aplicaErro(1)
    } else {
        removeErro(1)
    }
}