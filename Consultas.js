const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let consultas = [];

function mostrarMenu() {
    console.log('-----------Menu-----------');
    console.log('1. Adicionar uma nova consulta');
    console.log('2. Listar todas as consultas');
    console.log('3. Atualizar uma consulta existente');
    console.log('4. Cancelar uma consulta');
    console.log('5. Sair');
    rl.question('Escolha uma opção: ', (opção) => {
        switch (opção.trim()) {
            case '1':
                novaConsulta();
                break;
            case '2':
                listarConsultas();
                break;
            case '3':
                atualizarConsulta();
                break;
            case '4':
                cancelarConsulta();
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

function novaConsulta() {
    rl.question('Nome do paciente: ', (nome) => {
        rl.question('Nome do médico: ', (nome2) => {
            rl.question('Data da consulta (dd/mm/yyyy): ', (data) => {
                rl.question('Hora da consulta (hh:mm): ', (hora) => {
                    const consulta = {
                        nome: nome.trim(),
                        nome2: nome2.trim(),
                        data: data.trim(),
                        hora: hora.trim()
                    };
                    consultas.push(consulta);
                    console.log('Consulta adicionada com sucesso!');
                    mostrarMenu();
                });
            });
        });
    });
}

function listarConsultas() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta foi adicionada.');
        mostrarMenu();
        return;
    }
    console.log('Consultas:');
    consultas.forEach((consulta, index) => {
        console.log(`${index + 1}. ${consulta.nome} - ${consulta.nome2} - ${consulta.data} ${consulta.hora}`);
    });
    mostrarMenu();
}

function atualizarConsulta() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta foi adicionada.');
        mostrarMenu();
        return;
    }
    rl.question('Informe o número da consulta que deseja atualizar: ', (index) => {
        index = parseInt(index.trim()) - 1;
        if (isNaN(index) || index < 0 || index >= consultas.length) {
            console.log('Consulta inválida.');
            mostrarMenu();
            return;
        }
        const consulta = consultas[index];
        rl.question(`Nome do paciente (atual: ${consulta.nome}): `, (nome) => {
            rl.question(`Nome do médico (atual: ${consulta.nome2}): `, (nome2) => {
                rl.question(`Data da consulta (dd/mm/yyyy) (atual: ${consulta.data}): `, (data) => {
                    rl.question(`Hora da consulta (hh:mm) (atual: ${consulta.hora}): `, (hora) => {
                        consultas[index] = {
                            nome: nome.trim(),
                            nome2: nome2.trim(),
                            data: data.trim(),
                            hora: hora.trim()
                        };
                        console.log('Consulta atualizada com sucesso!');
                        mostrarMenu();
                    });
                });
            });
        });
    });
}

function cancelarConsulta() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta foi adicionada.');
        mostrarMenu();
        return;
    }
    rl.question('Informe o número da consulta que deseja cancelar: ', (index) => {
        index = parseInt(index.trim()) - 1;
        if (isNaN(index) || index < 0 || index >= consultas.length) {
            console.log('Consulta inválida.');
            mostrarMenu();
            return;
        }
        consultas.splice(index, 1);
        console.log('Consulta cancelada com sucesso!');
        mostrarMenu();
    });
}

mostrarMenu();