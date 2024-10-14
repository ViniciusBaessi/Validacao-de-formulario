const campos = document.querySelectorAll("[required]");
const spans = document.querySelectorAll('.span-required');
const checkbox = document.querySelector('#checkbox');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const form = document.querySelector('#form');
const button = document.querySelector('.enviar');
let erro = "sem erro";  // Inicializa a variável erro

// Função para mostrar a mensagem de sucesso
function mostrarMensagemSucesso() {
    alert("Cadastro enviado com sucesso!");
}

// Adiciona o ouvinte de eventos ao botão
button.addEventListener('click', function(event) {
    event.preventDefault();

    // Reinicia a variável de erro para cada nova tentativa
    erro = "sem erro";  

    // Validações
    validanome(); 
    validaemail();
    validarg();
    validaCPF();
    validaIdade();
    validacheck(); 

    // Se houver erro, não prossegue
    if (erro !== "sem erro") {
        console.log(erro);
        return;  
    }

    // Objeto que receberá os dados
    const usuario = { 
        nome: `${campos[0].value}`, 
        email: `${campos[1].value}`, 
        RG: `${campos[2].value}`, 
        CPF: `${campos[3].value}`, 
        Nascimento: `${campos[4].value}` 
    };

    // Armazenando o objeto no localStorage
    localStorage.setItem("Cadastro", JSON.stringify(usuario));

    // Exibir mensagem de sucesso
    mostrarMensagemSucesso();

    // Limpar campos
    campos[0].value = "";
    campos[1].value = "";
    campos[2].value = "";
    campos[3].value = "";
    campos[4].value = "";
});

// Aplica a estilização caso o critério não seja atendido
function aplicaErro(index) {
    campos[index].style.border = '2px solid #e63636';
    spans[index].style.display = 'block';
    erro = "Existem erros, verifique"; // Atualiza a variável erro
}

// Remove a estilização caso o critério seja atendido
function removeErro(index) {
    campos[index].style.border = '';
    spans[index].style.display = 'none';
}

// Valida o nome
function validanome() {
    if (campos[0].value.length < 3) {
        aplicaErro(0);
    } else {
        removeErro(0);
    }
}

// Valida o email
function validaemail() {
    if (!emailRegex.test(campos[1].value)) {
        aplicaErro(1);
    } else {
        removeErro(1);
    }
}

// Valida o RG
function validarg() {
    const rg = campos[2].value.replace(/\.|-|\//g, "");
    if (rg.length !== 9) {
        aplicaErro(2);
    } else {
        removeErro(2);
    }
}

// Valida o CPF
function validaCPF() {
    const cpf = campos[3].value.replace(/\.|-/g, "");
    if (cpf.length !== 11 || digito1(cpf) || digito2(cpf)) {
        aplicaErro(3);
    } else {
        removeErro(3);
    }
}

// Função para calcular o primeiro dígito do CPF
function digito1(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for (let i = 0; i < 9; i++) {
        soma += cpf[i] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;
    return soma == 10 || soma == 11 ? 0 : soma != cpf[9];
}

// Função para calcular o segundo dígito do CPF
function digito2(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let i = 0; i < 10; i++) {
        soma += cpf[i] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;
    return soma == 10 || soma == 11 ? 0 : soma != cpf[10];
}

// Valida a idade
function validaIdade() {
    const datanasc = new Date(campos[4].value);
    datanasc.setDate(datanasc.getDate() + 1);
    const dataatual = new Date();
    const dataMais18 = new Date(datanasc.getUTCFullYear() + 18, datanasc.getUTCMonth(), datanasc.getUTCDate() - 1);

    if (dataatual <= dataMais18) {
        aplicaErro(4); 
    } else {
        removeErro(4); 
    }
}

// Valida o checkbox
function validacheck() {
    if (!checkbox.checked) {
        aplicaErro(5);
    } else {
        removeErro(5);
    }
}
