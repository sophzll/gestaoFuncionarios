//classe Funcionario
class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    //get e set
    get nome() {
        return this._nome;
    }

    set nome(novoNome) {
        this._nome = novoNome;
    }

    get idade() {
        return this._idade;
    }

    set idade(novaIdade) {
        this._idade = novaIdade;
    }

    get cargo() {
        return this._cargo;
    }

    set cargo(novoCargo) {
        this._cargo = novoCargo;
    }

    get salario() {
        return this._salario;
    }

    set salario(novoSalario) {
        this._salario = novoSalario;
    }

    toString() {
        return this.nome + " - " + this.idade + " anos - " +
            this.cargo + " - R$ " + this.salario.toFixed(2);
    }
}

let funcionarios = [];
let indiceEdicao = -1;
//buscar funcionário pelo índice usando arrow function
const buscarFuncionario = (indice) => {
    return funcionarios.find((funcionario, i) => i === indice);
};
const formulario = document.getElementById("formFuncionario");
const tabela = document.getElementById("tabelaFuncionarios");
const corpoTabela = document.getElementById("corpoTabela");
const mensagem = document.getElementById("mensagem");

//cadastrar funcionário
function cadastrarFuncionario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const cargo = document.getElementById("cargo").value.trim();
    const salario = Number(document.getElementById("salario").value);

    if (nome === "" || idade <= 0 || cargo === "" || salario < 0) {
        mensagem.textContent = "Preencha todos os campos corretamente.";
        return;
    }

    if (indiceEdicao === -1) {
        const funcionario = new Funcionario(nome, idade, cargo, salario);
        funcionarios.push(funcionario);

        mensagem.textContent = "Funcionário cadastrado com sucesso!";
    } else {
    const funcionario = buscarFuncionario(indiceEdicao);

    if (!funcionario) {
        mensagem.textContent = "Funcionário não encontrado.";
        indiceEdicao = -1;
        return;
    }

    funcionario.nome = nome;
    funcionario.idade = idade;
    funcionario.cargo = cargo;
    funcionario.salario = salario;

        mensagem.textContent = "Funcionário atualizado com sucesso!";

        indiceEdicao = -1;
    }

    formulario.reset();
    listarFuncionarios();
}

//exibir funcionários na tabela
function listarFuncionarios() {
    corpoTabela.innerHTML = "";

    funcionarios.forEach((funcionario, indice) => {
        const linha = document.createElement("tr");

        const celulaNome = document.createElement("td");
        celulaNome.textContent = funcionario.nome;
        linha.appendChild(celulaNome);

        const celulaIdade = document.createElement("td");
        celulaIdade.textContent = funcionario.idade;
        linha.appendChild(celulaIdade);

        const celulaCargo = document.createElement("td");
        celulaCargo.textContent = funcionario.cargo;
        linha.appendChild(celulaCargo);

        const celulaSalario = document.createElement("td");
        celulaSalario.textContent = funcionario.salario.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        linha.appendChild(celulaSalario);

        const celulaAcoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", () => {
        editarFuncionario(indice);
        });
        

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", () => {
        excluirFuncionario(indice);
        });

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(document.createTextNode(" "));
        celulaAcoes.appendChild(botaoExcluir);

        linha.appendChild(celulaAcoes);

        corpoTabela.appendChild(linha);
    });

    tabela.hidden = funcionarios.length === 0;
}
//funções de excluir e editar com arrow function
const editarFuncionario = (indice) => {
    const funcionario = buscarFuncionario(indice);

    if (!funcionario) {
        return;
    }

    document.getElementById("nome").value = funcionario.nome;
    document.getElementById("idade").value = funcionario.idade;
    document.getElementById("cargo").value = funcionario.cargo;
    document.getElementById("salario").value = funcionario.salario;

    indiceEdicao = indice;

    mensagem.textContent = "Editando funcionário: " + funcionario.nome;
};
//e filter
const excluirFuncionario = (indice) => {
    const funcionario = buscarFuncionario(indice);

    if (!funcionario) {
        return;
    }

    const nome = funcionario.nome;

    funcionarios = funcionarios.filter((func, i) => i !== indice);

    if (indiceEdicao === indice) {
        indiceEdicao = -1;
        formulario.reset();
    } else if (indiceEdicao > indice) {
        indiceEdicao--;
    }

    listarFuncionarios();

    mensagem.textContent = "Funcionário " + nome + " excluído com sucesso!";
};

formulario.addEventListener("submit", (event) => {
    cadastrarFuncionario(event);
});
//filter percorre o array e acha os salarios >5000
const salariosAcima5000 = () => {
    const resultado = funcionarios.filter(
        (funcionario) => funcionario.salario > 5000
    );

    return resultado;
};
//reduce soma todos os salarios e divide pela qnt de funcionarios
const calcularMediaSalarial = () => {
    if (funcionarios.length === 0) {
        return 0;
    }

    const soma = funcionarios.reduce(
        (total, funcionario) => total + funcionario.salario, 0
    );

    return soma / funcionarios.length;
};
//map() cria uma lista contendo apenas os cargos dos funcionários e o set() elimina os valores repetidos.
const listarCargosUnicos = () => {
    const cargos = funcionarios.map(
        (funcionario) => funcionario.cargo
    );

    return [...new Set(cargos)];
};

const listarNomesMaiusculos = () => {
    return funcionarios.map(
        (funcionario) => funcionario.nome.toUpperCase()
    );
};
const exibirRelatorio = (titulo, itens) => {
    resultadoRelatorio.innerHTML = "";

    const subtitulo = document.createElement("h4");
    subtitulo.textContent = titulo;
    resultadoRelatorio.appendChild(subtitulo);

    if (itens.length === 0) {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = "Nenhum resultado encontrado.";
        resultadoRelatorio.appendChild(paragrafo);
        return;
    }

    const lista = document.createElement("ul");

    itens.forEach((item) => {
        const linha = document.createElement("li");
        linha.textContent = item;
        lista.appendChild(linha);
    });

    resultadoRelatorio.appendChild(lista);
};
document.getElementById("btnSalarios").addEventListener("click", () => {
    const funcionariosFiltrados = salariosAcima5000();

    const lista = funcionariosFiltrados.map(
        (funcionario) => funcionario.toString()
    );

    exibirRelatorio("Funcionários com salário acima de R$ 5.000", lista);
});
document.getElementById("btnMediaSalarial").addEventListener("click", () => {
    const media = calcularMediaSalarial();

    const valorFormatado = media.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    exibirRelatorio("Média salarial", [valorFormatado]);
});
document.getElementById("btnCargos").addEventListener("click", () => {
    const cargos = listarCargosUnicos();

    exibirRelatorio("Cargos únicos", cargos);
});
document.getElementById("btnNomes").addEventListener("click", () => {
    const nomes = listarNomesMaiusculos();

    exibirRelatorio("Nomes em maiúsculo", nomes);
});
