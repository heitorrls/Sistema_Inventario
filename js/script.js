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

            const tdAcoes = document.createElement('td');
            const botaoDeletar = document.createElement('button');

            botaoDeletar.textContent = 'Deletar';
            botaoDeletar.classList.add('btn-deletar');

            botaoDeletar.onclick = () => deletarProduto(produto.id);

            
            tdAcoes.appendChild(botaoDeletar);
             
            tr.appendChild(tdProduto);
            tr.appendChild(tdQuantidade);
            tr.appendChild(tdPrecoUnitario);
            tr.appendChild(tdAcoes);

            tabelaCorpo.appendChild(tr);
        });

    }
    catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    };
};

async function deletarProduto(id) {
    if(confirm('Tem certeza que deletar o produto?')) {
        const resposta = await fetch(`/deletar/${id}`, {method: 'DELETE' });
        if(resposta.ok) {
            document.getElementById(`linhas-${id}`).remove();
        } else {
            alert('Erro ao deletar')
        }
    }   
}

function filtrarProdutos() {
    // 1. Pega o valor digitado e transforma em minúsculo para a busca não ser sensível a maiúsculas
    const filtro = document.getElementById('inputBusca').value.toLowerCase();   
    // 2. Pega todas as linhas do corpo da tabela
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const linhas = tabelaCorpo.getElementsByTagName('tr');
    // 3. Percorre cada linha
    for (let i = 0; i < linhas.length; i++) {
        const tdProduto = linhas[i].getElementsByTagName('td')[0];

        if (tdProduto) {
            const textoProduto = tdProduto.textContent || tdProduto.innerText;

            if (textoProduto.toLowerCase().indexOf(filtro) > -1 ) {
                linhas[i].style.display = "";
                
            } else {
                linhas[i].style.display = "none";
            }
        }
    }
        // Pega a primeira coluna (onde está o Nome do Produto)
        
            
            // 4. Se o nome do produto contiver o que foi digitado, mostra a linha, senão esconde
}
window.onload = carregarProdutos;