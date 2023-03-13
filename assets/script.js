const CamposDoFormulario = document.querySelectorAll("[required]");

let cpf = document.getElementById('cpf')


cpf = cpf.value
console.log(cpf)
localStorage.setItem("champs",cpf)


console.log(CamposDoFormulario)



//Em resumo, assim que o usuário clicar no formulário, digitar e clicar fora do formulário, será executada a função (VerificaCampo) para validar o dado.

CamposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => VerificaCampo(campo));
})

function VerificaCampo(campo){
    
}




function ValidaCPF (){

}