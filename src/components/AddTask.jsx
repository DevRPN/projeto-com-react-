import { useState } from "react";
import Input from "./input";

function AddTask({ onAddTaskSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
            <Input
                type="text"
                placeholder="Digite o titulo da tarefa"
                value={title}
                onChange={(Event) => setTitle(Event.target.value)}
            />


            <Input
                type="text"
                placeholder="Digite a descrição da tarefa"
                value={description}
                onChange={(Event) => setDescription(Event.target.value)}
            />
            <button
                onClick={() => {
                    // verificar se o titulo e a descrição estão preenchidos
                    if (!title.trim() || !description.trim()) {
                        return alert("Preencha o titulo e a descrição da tarefa.")
                    }
                    onAddTaskSubmit(title, description);
                    setTitle("");
                    setDescription("");
                }}
                className="bg-slate-500 text-white px-4 py-2 rounded-md"
            >
                Adicionar
            </button>
        </div>
    );
}
export default AddTask;
