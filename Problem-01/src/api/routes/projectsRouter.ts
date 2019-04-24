import express from 'express';
import projectsController from '../controllers/projectsController';

const projectsRouter = express.Router();

projectsRouter.get('', projectsController.getAll);
projectsRouter.get('/:id', projectsController.get);
projectsRouter.post('', projectsController.create);
projectsRouter.delete('/:id', projectsController.delete);
projectsRouter.put('/:id', projectsController.update);

export default projectsRouter;
