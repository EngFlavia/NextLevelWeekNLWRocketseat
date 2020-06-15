
// rota: endereço completo da requisição 
// recurso: qual entidade estamos acessando do sistema 

// GET: buscar uma ou mais informações do back-end
// POST: criar uma nova nformação no bacl-end
// PUT: atualizar uma informação existente no back-end
// DELETE :  remover informação do back-end

//POST http://localhost:3333/users = criar um ususario
//GET  http://localhost:3333/users = listar ususarios
//GET http://localhost:3333/users/5 = buscar dadods do usuario id 5

//Request Param: Parametros que vem na propria rota que identificam um recurso 
// Query Param: parametros que vem na própria rota geralmente opcionais para filtros, paginação
//request body: parametros para criação/ atualizacao da informacoes

//select * from users where name = 'Flavia'
//knex ('users') where ('name', 'Flavia') select ('*') 

import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));

app.listen(3333);
