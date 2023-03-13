const campos = document.querySelectorAll("[required]")
console.log(campos)

const spans = document.querySelectorAll('.span-required')

function validanome () {
    if (campos[0].value.length < 3 ) {
        console.log('lararu')
    } else {
        console.log('Ohhh brabo')
    }
}