const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let num = [];

function mostrarMenu() {
    console.log('-----------Menu-----------');
    console.log('1. Adicionar uma nova lista');
    console.log('2. Calcular média da lista');
    console.log('3. Calcular a mediana da lista');
    console.log('4. Calcular a moda da lista');
    console.log('5. Sair');
    rl.question('Escolha uma opção: ', (opção) => {
        switch (opção.trim()) {
            case '1':
                novaLista();
                break;
            case '2':
                mediaLista();
                break;
            case '3':
                medianaLista();
                break;
            case '4':
                modaLista();
                break;
            case '5':
                console.log('Saindo do programa.');
                rl.close();
                break;
            default:
                console.log('Opção inválida, tente novamente.');
                mostrarMenu();
                break;
        }
    });
}

function novaLista() {
    rl.question("Digite os números (separados por vírgula): ", (input) => {
        const newNum = input.split(',').map(valor => parseFloat(valor.trim()));
        
        if (newNum.some(isNaN) || newNum.some(valor => valor <= 0)) {
            console.log('Número inválido. O valor deve ser um número positivo.')
            mostrarMenu();
            return;
        }
        num = newNum; //substitui a lista atual
        console.log('Números adicionados: ', num);

        mostrarMenu();
    });
}

function mediaLista () {
    if (num.length === 0) {
        console.log('A lista de números está vazia.');
        mostrarMenu();
        return;
    }
    const soma = num.reduce((acc, val) => acc + val, 0);
    const media = soma / num.length;
    console.log("A média da lista é:", media);

    mostrarMenu();

}

function medianaLista () {
    if (num.length === 0) {
        console.log('A lista de números está vazia.');
        mostrarMenu();
        return;
    }

    // Ordena a lista
    num.sort((a, b) => a - b);

    if (num.length % 2 === 0) { // lista com número par de elementos
        const mediana1 = num[num.length / 2 - 1];
        const mediana2 = num[num.length / 2];
        const mediana = (mediana1 + mediana2) / 2;
        console.log('A mediana da lista é:', mediana);
    } else { // lista com número ímpar de elementos
        const mediana = num[Math.floor(num.length / 2)];
        console.log('A mediana da lista é:', mediana);
    }

    mostrarMenu();
}

function modaLista () {
    if (num.length === 0) {
        console.log('A lista de números está vazia.');
        mostrarMenu();
        return;
    }

    const counts = {};

    num.forEach(num => {
        counts[num] = (counts[num] || 0) + 1;
    });

    let maxCount = 0;
    let mode = [];

    for (let num in counts) {
        if (counts[num] > maxCount) {
            maxCount = counts[num];
            mode = [num];
        } else if (counts[num] === maxCount) {
            mode.push(num);
        }
    }

    console.log('A moda da lista é:', mode);

    mostrarMenu();
}

mostrarMenu();


