// Função para sortear números
function sortearNumeros() {
    const quantidade = parseInt(document.getElementById('numbers').value);
    const inicio = parseInt(document.getElementById('start').value);
    const fim = parseInt(document.getElementById('end').value);
    const naoRepetir = document.querySelector('.checkbox input').checked;

    if (isNaN(quantidade) || isNaN(inicio) || isNaN(fim) || inicio >= fim || quantidade <= 0) {
        alert('Por favor, insira um intervalo válido e quantidade de números.');
        return;
    }

    const numerosSorteados = [];
    const numerosDisponiveis = [];

    // Preencher array com números disponíveis no intervalo
    for (let i = inicio; i <= fim; i++) {
        numerosDisponiveis.push(i);
    }

    // Sorteio de números
    while (numerosSorteados.length < quantidade) {
        const indexAleatorio = Math.floor(Math.random() * numerosDisponiveis.length);
        const numeroSorteado = numerosDisponiveis[indexAleatorio];

        if (naoRepetir) {
            // Remover o número sorteado da lista de disponíveis
            numerosDisponiveis.splice(indexAleatorio, 1);
        }

        numerosSorteados.push(numeroSorteado);
        
        if (!naoRepetir && numerosSorteados.length >= quantidade) {
            break;
        }

        if (naoRepetir && numerosDisponiveis.length === 0) {
            alert('Não há números suficientes disponíveis para sortear sem repetição.');
            break;
        }
    }

    // Exibir os números sorteados na tela
    exibirNumeros(numerosSorteados);

    // Alterar o display das seções após o sorteio
    document.querySelector('.main').style.display = 'none';   // Ocultar a seção "main"
    document.querySelector('.result').style.display = 'block'; // Mostrar a seção "result"
}

// Função para exibir números sorteados na tela
function exibirNumeros(numeros) {
    const divNumeros = document.querySelector('.numbers');
    divNumeros.innerHTML = ''; // Limpar resultados anteriores

    numeros.forEach(numero => {
        const span = document.createElement('span');
        span.classList.add('number');
        span.textContent = numero;
        divNumeros.appendChild(span);
    });
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    document.getElementById('numbers').value = '';
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.querySelector('.numbers').innerHTML = ''; // Limpar números exibidos

    // Alternar a exibição de volta para a seção "main"
    document.querySelector('.main').style.display = 'block';   // Mostrar a seção "main"
    document.querySelector('.result').style.display = 'none';  // Ocultar a seção "result"
}

// Adicionar eventos aos botões
document.querySelector('.buttons button').addEventListener('click', sortearNumeros);
document.querySelector('.reset-button').addEventListener('click', reiniciarSorteio);
