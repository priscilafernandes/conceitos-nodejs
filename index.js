const express = require("express");
const server = express();

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: []
  }
];

server.use(express.json());

function checkIdExists(req, res, next) {
  const { id } = req.params;
  const projectId = projects.find(item => item.id == id);
  
  if (!projectId) {
    return res.status(400).json({
      error: "Id não existe"
    });
  }

  return next();
};

let counter = 0;

server.use((req, res, next) => {
  console.time("Request");
  
  counter++;
  
  console.log(`Método: ${req.method}, Url: ${req.url}, Requisição nº: ${counter}`);
  
  next();

  console.timeEnd("Request");
});

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({
    id, 
    title, 
    tasks
  });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.filter(item => {
    if (item.id === id) {
      item.title = title
    }
  });
  
  return res.json(projects);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  projects.filter(item => {
    if (item.id === id) {      
      let indexProject = projects.indexOf(item);
      projects.splice(indexProject, 1);
    }
  });

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  projects.filter(item => {
    if (item.id === id) {
      item.tasks.push(title);
    }
  });

  return res.json(projects);
});

server.listen(3333);