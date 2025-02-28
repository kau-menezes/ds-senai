import { Express } from 'express';
import express from 'express'
import auth from './routes/auth.routes.ts';
import task from "./routes/task.routes.ts";

export default function (app: Express) {
app
    .use(express.json())
    .use('/tasks', task)
    .use('/api/auth', auth)
}