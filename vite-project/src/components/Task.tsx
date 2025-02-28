import { JSX } from "react";
import { ITask } from "../models/ITask";

interface TaskProps extends ITask {
  updateTasks: (_id: string, status: number) => void; // Callback for updating status
}

export default function Task({ _id, description, status, updateTasks }: TaskProps): JSX.Element {
  const updateStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status === 1 ? 0 : 1 }), // Use JSON.stringify
      });

      if (!response.ok) {
        throw new Error('Error while updating task.');
      }

      const res = await response.json();
      console.log("Updated task:", res);
      
      // Call updateTasks callback to update status locally in the parent component
      updateTasks(_id, status === 1 ? 0 : 1); // Update the status in the parent

    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error while deleting task.');
      }
  
      // Instead of calling `updateTasks` with the status, pass the task ID for removal
      console.log("Task deleted successfully:", _id);
      
      // Call updateTasks with a special action for deletion
      updateTasks(_id, -1); // Let's assume -1 will signal the deletion
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <div className="flex justify-start gap-4 items-center w-50">
        <div onClick={updateStatus}>
          {status === 1 ? (
            <img src="/assets/check.png" className="w-5 h-5 hover:cursor-pointer" alt="Completed" />
          ) : (
            <div className="w-5 h-5 border-1 border-gray-600 rounded-[100%] hover:cursor-pointer"></div>
          )}
        </div>
        <div className="flex justify-between w-40 items-center group"> 
          <p>{description}</p>
          <img 
            src="/assets/trash.png" 
            className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" 
            alt={`Delete task ${_id}`}
            onClick={ () => deleteTask(_id)}
            
          />
        </div>
      </div>
    </>
  );
}
