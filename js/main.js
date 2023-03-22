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

        storageItens[storageItens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {
        itemAtual.id = storageItens[storageItens.length - 1] ? (storageItens[storageItens.length - 1].id + 1) : 0;
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
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    storageItens.splice(storageItens.findIndex(elemento => elemento.id == id), 1)

    localStorage.setItem("itens", JSON.stringify(storageItens))
}