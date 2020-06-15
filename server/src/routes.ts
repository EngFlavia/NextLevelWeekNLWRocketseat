import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//index: mostrar listagem, show: se for mostar um unico registro, create(store) criar, update atualizar, delete deletar

routes.get('/items', itemsController.index); 
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);



export default routes;

// Service Pattern
//Respository Pattern 
