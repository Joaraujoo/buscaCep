
//evita multiplas execuçoes
document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('.formulario')
    let btnPesquisar = document.querySelector('.btn')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })

    btnPesquisar.addEventListener('click', () => {
        let inputCep = document.querySelector('.input').value.trim()
        let resultado = document.querySelector('.resultado')

        // Limpa o conteúdo anterior
        resultado.innerHTML = ""

        //verifica se o campo input esta invalido
        if (inputCep === "" || inputCep.length < 8) {
            resultado.innerHTML = "Digite um CEP válido"
            resultado.style.color = "red"
            document.querySelector('.input').value = ""
            return
        }

        // Chama a função para buscar o CEP
        buscarCep(inputCep)
        document.querySelector('.input').value = ""
    });
});

async function buscarCep(cep) {
    try {
        let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        let respostaJson = await resposta.json()

        if (respostaJson.erro) {
            throw new Error('CEP não encontrado')
        }

        let { bairro, localidade, logradouro, uf } = respostaJson
        mostrarResultado(logradouro, bairro, localidade, uf)

    } catch (e) {
       console.log(e.message)
    }
}

function mostrarResultado(logradouro, bairro, localidade, uf) {
    let resultado = document.querySelector('.resultado')
    resultado.style.color = "black"

    // Criando a lista
    let ul = document.createElement('ul')
    let itens = [
        `Rua: ${logradouro}`,
        `Bairro: ${bairro}`,
        `Cidade: ${localidade}`,
        `UF: ${uf}`
    ]

    itens.forEach(texto => {
        let li = document.createElement('li')
        li.innerHTML = texto
        ul.appendChild(li)
    })

    resultado.appendChild(ul)
}