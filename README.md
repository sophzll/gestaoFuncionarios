# Sistema de Gestão de Funcionários

Projeto desenvolvido para o estudo de caso de gerenciamento de funcionários de uma startup de tecnologia.

## Requisitos atendidos

### Exercício 1 - Cadastro e Listagem
- Cadastro de funcionários.
- Listagem em tabela HTML.
- Armazenamento em array de objetos na memória.
- Classe `Funcionario`.
- Atributos: `nome`, `idade`, `cargo` e `salario`.
- Construtor, getters e setters.
- Método `toString()`.

### Exercício 2 - Exclusão e Edição
- Edição de funcionários cadastrados.
- Exclusão de registros.
- Atualização automática da tabela.
- Manipulação do DOM.
- Mensagens ao cadastrar, editar e excluir.

### Exercício 3 - Funções Anônimas e Expressões Lambda
- Uso de `addEventListener`.
- Funções anônimas nos eventos dos botões.
- Arrow functions nas operações com arrays.
- Busca de funcionários utilizando `find()`.
- Remoção utilizando `filter()`.
- Atualização de funcionários utilizando setters.

### Exercício 4 - Relatórios
- Funcionários com salário acima de R$ 5.000 utilizando `filter()`.
- Média salarial utilizando `reduce()`.
- Cargos únicos utilizando `map()` e `new Set()`.
- Nomes em maiúsculo utilizando `map()` e `toUpperCase()`.
- Exibição individual dos relatórios por meio de botões.

## Executar sem Docker

Abra o arquivo `index.html` no navegador.

## Executar com Docker

Na pasta do projeto, execute:

```bash
docker compose up --build
```

Depois, acesse:

http://localhost:8081

Para parar o container:

```bash
docker compose down
```