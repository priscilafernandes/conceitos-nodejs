## Conceitos do NodeJS

Aplicação para armazenar projetos e suas tarefas utilizando [Express](https://expressjs.com/pt-br/).

### Rotas

- `POST /projects`: Esta rota recebe as strings `id` e `title` dentro do corpo para cadastrar um novo projeto dentro de um array no seguinte formato: `{ id: "1", title: 'Novo projeto', tasks: [] }`;

- `GET /projects`: Rota que lista todos projetos e suas tarefas;

- `PUT /projects/:id`: Rota que altera apenas o título do projeto com o `id` presente no parâmetro da rota;

- `DELETE /projects/:id`: Rota que deleta o projeto com o `id` presente no parâmetro da rota;

- `POST /projects/:id/tasks`: Esta rota recebe um campo `title` e armazena uma nova tarefa no array de tarefas de um projeto específico escolhido através do `id` presente nos parâmetros da rota.

##### Exemplo

Chamando a rota `POST /projects` repassando `{ id: 1, title: 'Novo projeto' }` e a rota `POST /projects/1/tasks` com `{ title: 'Nova tarefa' }`, o array de projetos fica da seguinte forma:

```
[
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];
```

### Middlewares

- `checkIdExists`: é utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL e verifica se o projeto com aquele ID existe. Se não existir retorna o erro *"Id não existe"*;

- Middleware global: imprime (`console.log`) uma contagem de quantas requisições foram feitas na aplicação até então;