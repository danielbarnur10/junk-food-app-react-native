import { Router } from 'express';
import productController from '../controllers/product.controller'
const route = Router();

route.get('/',productController.getAll);
route.get('/',productController.getProductbyId);
route.post('/',productController.create);
route.patch('/',productController.update);
route.delete('/',productController.remove);

export default route;