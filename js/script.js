async function carregarProdutos() {
    try {
        const resposta = await fetch('/api/produtos');
        const produtos = await resposta.json();
        const tabelaCorpo = document.getElementById('tabela-corpo');
        tabelaCorpo.innerHTML = '';
    }
    
    catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

window.onload = carregarProdutos;