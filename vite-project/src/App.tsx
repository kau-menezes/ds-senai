import { useEffect, useState } from "react";
import Task from "./components/Task.tsx";
import { ITask } from "./models/ITask.ts";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState<string>(''); // Novo estado para o valor do input

  // Função para buscar os dados das tarefas
  const getTaskData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao recuperar tarefas.');
      }

      const res = await response.json();
      console.log("tasks:", res);

      setTasks(res); // Atualiza o estado com as tarefas recebidas
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskData(); // Chama a função para buscar as tarefas quando o componente for montado
  }, []);

  const updateTasks = (taskId: string, status: number) => {
    if (status === -1) {
      // If status is -1, delete the task from the list
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
    } else {
      // Otherwise, just update the status
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: status } : task
      );
      setTasks(updatedTasks);
    }
  };

  const createTask = async () => {
    if (newTaskDescription.trim() === "") {
      alert("Por favor, insira uma descrição para a tarefa");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newTaskDescription, status: 0 }), // Passa a descrição e o status
      });

      if (!response.ok) {
        throw new Error('Erro ao criar nova tarefa.');
      }

      const res = await response.json();
      console.log("task:", res);
      setNewTaskDescription(''); // Limpa o campo de entrada após criar a tarefa
      getTaskData(); // Atualiza a lista de tarefas
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="h-[100vh] w-[100vw] pt-10 flex flex-col items-center">
        <div className="flex justify-center items-center w-[100%] gap-2">
          <h1 className="justify-center font-bold text-4xl">To do list</h1>
          <img src="/assets/clipboard.png" className="w-10 h-10" alt="" />
        </div>
        <div className="flex flex-col items-center mt-10 w-75">
          {tasks.map((e) => (
            <Task
              key={e._id}
              description={e.description}
              status={e.status}
              _id={e._id}
              updateTasks={updateTasks}
            />
          ))}
        </div>
        <div className="flex items-center justify-center flex-col py-8 gap-4">
          <input
            type="text"
            value={newTaskDescription} // Vincula o valor do input ao estado
            onChange={(e) => setNewTaskDescription(e.target.value)} // Atualiza o estado quando o valor muda
            placeholder="Type in your new task..."
            className="p-2 border rounded w-50"
          />
          <button
            onClick={createTask}
            className="ml-2 p-2 bg-blue-500 w-50 text-white rounded hover:cursor-pointer hover:bg-blue-600"
          >
            Add new task
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
