const chaveCarrinho = "carrinho_sabor_imperio";

const produtos = {
    "Hamburguer Classico": {
        preco: 15.00,
        imagem: "img/lanche1.jfif",
        descricao: "Um hamburguer saboroso com carne suculenta, queijo cheddar derretido e molhos especiais."
    },
    "Salgados em Geral": {
        preco: 10.00,
        imagem: "img/lanche2.jfif",
        descricao: "Uma selecao de salgadinhos fritos crocantes, como coxinhas e risoles."
    },
    "X-Tudo": {
        preco: 18.00,
        imagem: "img/lanche3.jfif",
        descricao: "Um lanche completo com hamburguer, queijo, bacon, alface, tomate e molho especial."
    },
    "Fatia de Torta": {
        preco: 12.00,
        imagem: "img/lanche4.jfif",
        descricao: "Uma deliciosa fatia de torta caseira, recheada com creme de chocolate ou frutas frescas."
    },
    "Tacos Mexicanos": {
        preco: 16.00,
        imagem: "img/lanche5.jfif",
        descricao: "Tacos crocantes recheados com carne temperada, queijo, guacamole e molho picante."
    },
    "Pizza Recheada": {
        preco: 20.00,
        imagem: "img/lanche6.jfif",
        descricao: "Pizza com borda recheada com queijo, molho de tomate e ingredientes frescos."
    },
    "Sushi": {
        preco: 22.00,
        imagem: "img/sushi.jfif",
        descricao: "Combinado de sushis frescos com peixe cru, arroz temperado e alga nori."
    },
    "Sanduiche": {
        preco: 14.00,
        imagem: "img/sanduiche.jfif",
        descricao: "Um sanduiche classico com paes frescos, carne suculenta, queijo e molho especial."
    },
    "Strogonoff de Frango": {
        preco: 19.00,
        imagem: "img/strogonoffFrango.jfif",
        descricao: "Frango em molho cremoso com cogumelos e creme de leite."
    },
    "Strogonoff de Carne": {
        preco: 21.00,
        imagem: "img/strogonoffCarne.jfif",
        descricao: "Carne suculenta em molho cremoso com cogumelos e creme de leite."
    },
    "Lasanha": {
        preco: 20.00,
        imagem: "img/lasanha.jfif",
        descricao: "Lasanha de carne ou frango com molho branco, molho de tomate e queijo derretido."
    },
    "Cachorro Quente": {
        preco: 11.00,
        imagem: "img/cachorroQuente.jfif",
        descricao: "Tradicional cachorro quente com salsicha, ketchup, mostarda e batata palha."
    },
    "Coca-Cola": {
        preco: 6.00,
        imagem: "img/coca.jfif",
        descricao: "Refresco classico com aquele sabor inconfundivel."
    },
    "Suco de Laranja": {
        preco: 7.00,
        imagem: "img/suco-de-laranja.jfif",
        descricao: "Suco natural, feito com laranjas frescas."
    },
    "Agua Mineral": {
        preco: 4.00,
        imagem: "img/agua.jfif",
        descricao: "Agua pura e refrescante."
    },
    "Guarana Antarctica": {
        preco: 6.00,
        imagem: "img/guarana.jfif",
        descricao: "Refrigerante nacional com sabor unico e refrescante."
    },
    "Fanta Uva": {
        preco: 6.00,
        imagem: "img/fanta-uva.jfif",
        descricao: "Refrigerante sabor uva, delicioso e refrescante."
    },
    "Suco de Manga": {
        preco: 7.00,
        imagem: "img/suco-de-manga.jfif",
        descricao: "Suco refrescante com a docura natural da manga."
    }
};

let produtoSelecionado = null;

function obterCarrinho() {
    return JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
}

function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function atualizarContadorCarrinho() {
    const contadores = document.querySelectorAll(".contador-carrinho");
    const carrinho = obterCarrinho();
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    contadores.forEach(contador => {
        contador.textContent = totalItens;
    });
}

function abrirModalProduto(nome) {
    const dados = produtos[nome];
    if (!dados) return;

    produtoSelecionado = nome;

    const modal = document.getElementById("modal-produto");
    const modalNome = document.getElementById("modal-produto-nome");
    const modalImagem = document.getElementById("modal-produto-imagem");
    const modalDescricao = document.getElementById("modal-produto-descricao");
    const modalPreco = document.getElementById("modal-produto-preco");
    const modalQuantidade = document.getElementById("modal-quantidade");

    if (!modal || !modalNome || !modalImagem || !modalDescricao || !modalPreco || !modalQuantidade) return;

    modalNome.textContent = nome;
    modalImagem.src = dados.imagem;
    modalImagem.alt = nome;
    modalDescricao.textContent = dados.descricao;
    modalPreco.textContent = formatarPreco(dados.preco);
    modalQuantidade.value = 1;

    modal.classList.add("ativo");
    document.body.classList.add("sem-scroll");
}

function fecharModalProduto() {
    const modal = document.getElementById("modal-produto");
    if (!modal) return;
    modal.classList.remove("ativo");
    document.body.classList.remove("sem-scroll");
    produtoSelecionado = null;
}

function alterarQuantidadeModal(valor) {
    const input = document.getElementById("modal-quantidade");
    if (!input) return;
    let quantidadeAtual = parseInt(input.value) || 1;
    quantidadeAtual += valor;
    if (quantidadeAtual < 1) quantidadeAtual = 1;
    input.value = quantidadeAtual;
}

function confirmarAdicionarCarrinho() {
    if (!produtoSelecionado) return;

    const input = document.getElementById("modal-quantidade");
    let quantidade = parseInt(input.value);
    if (isNaN(quantidade) || quantidade < 1) quantidade = 1;

    const carrinho = obterCarrinho();
    const itemExistente = carrinho.find(item => item.nome === produtoSelecionado);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome: produtoSelecionado, quantidade: quantidade });
    }

    salvarCarrinho(carrinho);
    atualizarContadorCarrinho();
    fecharModalProduto();
    alert("Produto adicionado ao carrinho!");
}

function removerItem(index) {
    const carrinho = obterCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    renderizarCarrinho();
    atualizarContadorCarrinho();
}

function alterarQuantidade(index, valor) {
    const carrinho = obterCarrinho();
    let quantidade = parseInt(valor);
    if (isNaN(quantidade) || quantidade < 1) quantidade = 1;
    carrinho[index].quantidade = quantidade;
    salvarCarrinho(carrinho);
    renderizarCarrinho();
    atualizarContadorCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem(chaveCarrinho);
    renderizarCarrinho();
    atualizarContadorCarrinho();
}

function finalizarCompra() {
    const carrinho = obterCarrinho();
    if (carrinho.length === 0) {
        alert("Seu carrinho esta vazio.");
        return;
    }
    alert("Compra finalizada com sucesso!");
    localStorage.removeItem(chaveCarrinho);
    renderizarCarrinho();
    atualizarContadorCarrinho();
}

function renderizarCarrinho() {
    const tabelaBody = document.getElementById("carrinho-body");
    const totalElemento = document.getElementById("total-carrinho");
    if (!tabelaBody || !totalElemento) return;

    const carrinho = obterCarrinho();
    tabelaBody.innerHTML = "";
    let totalGeral = 0;

    if (carrinho.length === 0) {
        tabelaBody.innerHTML = `<tr><td colspan="7">Seu carrinho esta vazio.</td></tr>`;
        totalElemento.textContent = formatarPreco(0);
        return;
    }

    carrinho.forEach((item, index) => {
        const dados = produtos[item.nome];
        if (!dados) return;

        const subtotal = dados.preco * item.quantidade;
        totalGeral += subtotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${dados.imagem}" alt="${item.nome}" class="img-carrinho"></td>
            <td>${item.nome}</td>
            <td class="descricao-carrinho">${dados.descricao}</td>
            <td>${formatarPreco(dados.preco)}</td>
            <td>
                <input type="number" min="1" value="${item.quantidade}" class="quantidade-input"
                    onchange="alterarQuantidade(${index}, this.value)">
            </td>
            <td>${formatarPreco(subtotal)}</td>
            <td><button class="btn-remover" onclick="removerItem(${index})">Remover</button></td>
        `;
        tabelaBody.appendChild(tr);
    });

    totalElemento.textContent = formatarPreco(totalGeral);
}

document.addEventListener("DOMContentLoaded", function () {
    renderizarCarrinho();
    atualizarContadorCarrinho();

    const modal = document.getElementById("modal-produto");
    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) fecharModalProduto();
        });
    }
});