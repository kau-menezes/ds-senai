import { Request, Response } from 'express';
import Task from "../model/task.model.ts";

class  taskController
{
    static async getTasks(req: Request, res: Response){
        try {
            const allTasks = await Task.find()
            res.status(200).send(allTasks);
        } catch (error) {
            res.status(400).send({message: `Error to retrieve tasks: ${error}`})
        }
    }
    
    static async createTask(req: Request, res: Response) {
    
        try {
            const {description, status} = req.body
        
            const newTask = new Task({description, status}) 
        
            await newTask.save()
            res.status(200).send({message: "Task added succesfully.", task: newTask})
            
        } catch (error) {
            res.status(400).send({message: `Error to create task: ${error}` , task: null})
        }
    
    }
    
    static async updatdeStatus(req: Request, res: Response)  {
        try {
            const {status} = req.body;
            const { id } = req.params;
        
            await Task.findByIdAndUpdate(id, {status: status});
            res.status(200).send({message: "Task updated succesfully.", task: await Task.findById(id)})
    
        } catch (error) {
            res.status(400).send({message: `Error to update task: ${error}` , task: null})
        }
    }
    
    static async delete(req: Request, res: Response){
        try {
            const {id} = req.params;
    
            await Task.findByIdAndDelete(id);
            res.status(200).send({message: "Task deleted succesfully."})
        } catch (error) {
            res.status(400).send({message: `Error to delete: ${error}`})
        }
    }
}


export default taskController
