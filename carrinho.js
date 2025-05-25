// JavaScript Carrinho
let carrinho = [];

const carrinhoDiv = document.querySelector('.conteudo-carrinho');
const totalDiv = document.querySelector('.preco-total');
let quantidadeCarrinhoElemento = document.getElementById('quantidade-carrinho');
const botaoComprar = document.getElementById('btn-comprar');
const linkComprar = document.getElementById('link-comprar');

function atualizarCarrinho() {
  carrinhoDiv.innerHTML = '';
  let total = 0;
  let quantidadeTotal = 0;

  carrinho.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'caixa-carrinho';
    itemDiv.innerHTML = `
      <img src="${item.imagem}" class="img-carrinho" alt="${item.nome}">
      <div class="titulo-produto-carrinho">${item.nome}</div>
      <div class="preco-carrinho">
        R$${item.preco.toFixed(2)}
        <input type="number" value="${item.quantidade}" class="quantidade-carrinho" min="1" onchange="atualizarQuantidade('${item.nome}', this.value)">
        <span class="remover-carrinho" onclick="removerDoCarrinho('${item.nome}')"><i class='bx bx-trash-alt'></i></span>
      </div>
    `;
    carrinhoDiv.appendChild(itemDiv);
    total += item.preco * item.quantidade;
    quantidadeTotal += item.quantidade;
  });

  totalDiv.textContent = `R$${total.toFixed(2)}`;
  quantidadeCarrinhoElemento.textContent = quantidadeTotal;

  // Habilitar/desabilitar botão de compra
  if (carrinho.length === 0) {
    botaoComprar.classList.add('botao-desabilitado');
    linkComprar.classList.add('botao-desabilitado');
  } else {
    botaoComprar.classList.remove('botao-desabilitado');
    linkComprar.classList.remove('botao-desabilitado');
  }

  localStorage.setItem('total', total);
}

function adicionarAoCarrinho(nome, preco, imagem, produtoNome) {
  const itemIndex = carrinho.findIndex(item => item.nome === nome);
  if (itemIndex > -1) {
    carrinho[itemIndex].quantidade++;
  } else {
    carrinho.push({ nome, preco, imagem, quantidade: 1 });
  }
  atualizarCarrinho();
}

function removerDoCarrinho(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  atualizarCarrinho();
}

function atualizarQuantidade(nome, quantidade) {
  const item = carrinho.find(item => item.nome === nome);
  if (item) {
    item.quantidade = parseInt(quantidade, 10);
    if (item.quantidade <= 0) {
      removerDoCarrinho(nome);
    } else {
      atualizarCarrinho();
    }
  }
}

// Abrir/fechar carrinho
document.getElementById('icone-carrinho').addEventListener('click', () => {
  document.querySelector('.carrinho1').classList.toggle('ativo');
});

document.getElementById('fechar-carrinho').addEventListener('click', () => {
  document.querySelector('.carrinho1').classList.remove('ativo');
});

// Impede a navegação se o carrinho estiver vazio
linkComprar.addEventListener('click', function (e) {
  if (carrinho.length === 0) {
    e.preventDefault();
    alert('Adicione pelo menos um item ao carrinho para continuar.');
  }
});

