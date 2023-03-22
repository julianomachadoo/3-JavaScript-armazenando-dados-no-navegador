const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const storageItens = JSON.parse(localStorage.getItem("itens")) || []


storageItens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = storageItens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        storageItens[existe.id] = itemAtual

    } else {
        itemAtual.id = storageItens.length
        criaElemento(itemAtual)
        storageItens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(storageItens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
