import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Title from "./components/Title";

function App() {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=10",
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setTasks(data);
        };
        // SE QUISER, VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
        // fetchTasks();
    }, []);


    function onTaskClick(taskId) {
        const newTasks = tasks.map((task) => {
            // Preciso Atualizar essa Tarefa
            if (task.id === taskId) {
                return { ...lask, isCompleted: !task.isCompleted };
            }

            // Não Preciso Atualizar essa Tarefa
            return task;
        });
        setTasks(newTasks);
    }

    function onDeleteTaskClick(taskId) {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(newTasks);
    }
    function onAddTaskSubmit(title, description) {
        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            isCompleted: false
        };
        setTasks([...tasks, newTask])

    }

    return (
        <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
            <div className="w-[500px] space-y-4">
                <Title>Gerenciador de Tarefas</Title>
                
                <AddTask onAddTaskSubmit={onAddTaskSubmit} />

                <Tasks
                    tasks={tasks}
                    onTaskClic={onTaskClick}
                    onDeleteTaskClick={onDeleteTaskClick}
                />
            </div>
        </div>
    );
}
export default App;
