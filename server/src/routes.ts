import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import ItemsController from './resource/items/ItemsController'

import PointsController from './resource/points/PointsController'
import PointSchema from './resource/points/PointSchema';
const pointSchema = PointSchema.schema();

const routes = express.Router();
const upload = multer(multerConfig);


const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index)

routes.post('/points', upload.single('image'), pointSchema, pointsController.create)

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)


export default routes;