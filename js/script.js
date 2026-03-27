async function carregarProdutos() {
    try {
        const resposta = await fetch('/produtos');
        const produtos = await resposta.json();
        const tabelaCorpo = document.getElementById('tabela-corpo');
        
        
        if(!resposta.ok) {
            throw new Error('Erro na procura dos produtos')
        }
        
        tabelaCorpo.innerHTML = '';

        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.id = `linhas-${produto.id}`

            const tdProduto = document.createElement('td');
            tdProduto.textContent = produto.nome;

            const tdQuantidade = document.createElement('td');
            tdQuantidade.textContent = produto.quantidade;

            const tdPrecoUnitario = document.createElement('td');
            tdPrecoUnitario.textContent = `R$ ${produto.preco_unitario}`;
        
            tr.appendChild(tdProduto);
            tr.appendChild(tdQuantidade);
            tr.appendChild(tdPrecoUnitario);

            tabelaCorpo.appendChild(tr);
        });

    }
    catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    };
};

window.onload = carregarProdutos;