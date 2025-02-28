import express, { Request, Response, Router } from 'express';
import Task from "../model/task.model.ts";
import taskController from '../controller/taskController.ts';

const router: Router = express.Router();

router
    .get('', taskController.getTasks)

    .post('', taskController.createTask)

    .patch('/:id', taskController.updatdeStatus)

    .delete('/:id', taskController.delete)

export default router
