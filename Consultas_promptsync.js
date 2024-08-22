const prompt = require('prompt-sync')();

let consultas = [];

function mostrarMenu() {
    console.log('----------------Menu----------------');
    console.log('1. Adicionar uma nova consulta');
    console.log('2. Listar todas as consultas');
    console.log('3. Atualizar uma consulta existente');
    console.log('4. Cancelar uma consulta');
    console.log('5. Sair');
    const opção = prompt('Escolha uma opção: '); {
        switch (opção.trim()) {
            case '1':
                inserirNovaConsulta();
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
                process.exit();
                break;
            default:
                console.log('Opção inválida, tente novamente.');
                mostrarMenu();
                break;
        }
    }
}

function novaConsulta(callback) {
    const nome = prompt('Nome do paciente: ');
    const nome2 = prompt('Nome do médico: ');
    const data = prompt('Data da consulta (dd/mm/yyyy): ');
    const hora = prompt('Hora da consulta (hh:mm): ');
        const consulta = {
            nome: nome.trim(),
            nome2: nome2.trim(),
            data: data.trim(),
            hora: hora.trim()
        };
        callback(consulta);
};

function inserirNovaConsulta() {
    novaConsulta((consulta) => {
        consultas.push(consulta);
        console.log('Consulta adicionada com sucesso!');  
        mostrarMenu(); 
    });
};

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
    let index = prompt('Informe o número da consulta que deseja atualizar.');
    index = parseInt(index.trim()) - 1;
    if (isNaN(index) || index < 0 || index >= consultas.length) {
        console.log('Consulta inválida.');
        mostrarMenu();
        return;
    }
    const consulta = consultas[index];
    const nome = prompt(`Nome do paciente (atual: ${consulta.nome}) `);
    const nome2 = prompt(`Nome do médico (atual: ${consulta.nome2}) `);
    const data = prompt(`Data da consulta (dd/mm/yyyy) (atual: ${consulta.data}) `);
    const hora = prompt(`Hora da consulta (hh:mm) (atual: ${consulta.hora}) `);
        consultas[index] = {
            nome: nome.trim(),
            nome2: nome2.trim(),
            data: data.trim(),
            hora: hora.trim()
        };
        console.log('Consulta atualizada com sucesso!');
        mostrarMenu();
};

function cancelarConsulta() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta foi adicionada.');
        mostrarMenu();
        return;
    }
    let index = prompt('Informe o número da consulta que deseja cancelar: ')
    index = parseInt(index.trim()) - 1;
    if (isNaN(index) || index < 0 || index >= consultas.length) {
        console.log('Consulta inválida.');
        mostrarMenu();
        return;
    }
    consultas.splice(index, 1);
    console.log('Consulta cancelada com sucesso!');
    mostrarMenu();
};

mostrarMenu();