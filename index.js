//DOM
//Pegando os elementos do HTML e transformando em uma const no Js para usar
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const sTelefone = document.querySelector('#m-telefone')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
//se for editar, vai pegar os valores pela id e retornar para poder editar
  if (edit) {
    sNome.value = itens[index].nome
    sEmail.value = itens[index].email
    sTelefone.value = itens[index].telefone
    id = index
  } else { //Se não, aparecerá vazio para então criar do zero uma id
    sNome.value = ''
    sEmail.value = ''
    sTelefone.value = ''
  }
  
}
//Muda os dados
function editItem(index) {
  openModal(true, index)
}
//Pega os dados, apaga eles e atualiza a tela sem os dados
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

//Inserindo os itens do banco de dados para a nossa tela em HTML
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>${item.telefone}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit bx-border-circle bx-tada-hover' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash bx-border-circle bx-tada-hover'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  //Se não preencher, vai pedir obrigatoriamente para abrir o campo
  if (sNome.value == '' || sEmail.value == '' || sTelefone.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].email = sEmail.value
    itens[id].telefone = sTelefone.value
  } else {
    itens.push({'nome': sNome.value, 'email': sEmail.value, 'telefone': sTelefone.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

//LoadingItens vai trazer os dados do banco para a tela quando atualiza ela
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

//Pegando os itens do banco, pode ser ver no Local Storage
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()