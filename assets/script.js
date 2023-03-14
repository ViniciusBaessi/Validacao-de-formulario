const campos = document.querySelectorAll("[required]")

const spans = document.querySelectorAll('.span-required')

const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const form = document.querySelector('.form')


let arraymult = [10,9,8,7,6,5,4,3,2]
let arraycpf = []
let arraysoma = []

let contador = 0


//Ao clicar no botão enviar, todas as validações serão feitas ao mesmo tempo, através de um ouvinte de eventos no (form)
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


function validaCPF () {



    //Pega os valores digitados no campo CPF e remove os carcteres especiais (\, ., -), após esse tratamento, o dado é armazenado na variável CPF
    const cpf = campos[3].value.replace(/\.|-/g, "")

    

    console.log (cpf)


    //Insere os primeiros 9 digitos dentro do array
    arraycpf = cpf.slice(0, 9).split("")

    console.log (arraycpf)
    

    console.log(arraymult)


    
        
        // O (arraysoma) recebe o resultado da multiplicação entre o (arraycpf) e o (arraymult)
        arraysoma[contador] = arraycpf[contador] * arraymult[contador]

        
        contador = contador + 1
    

        
        //Se o arraysoma for maior que 11, remova as duas casas, pois precisarei apenas dos primeiros 9 caracteres
        if ( arraysoma.length == 11) {
            arraysoma.splice(-2, 2)
            console.log(arraysoma)


            //For para somar toos os valores de (arraysoma)

            let soma = 0;
            for (let i = 0; i < arraysoma.length; i++) {
              soma += arraysoma[i];
            }


            //A variável soma recebe o resto da divisão de (arraysoma) por 11, subtraído por 8
            soma = (soma % 11) - 8
            
           

            /*
            11-8 <= 9 TRUE

            != 11-8 <= 9 FALSE
            */
       
        }

}