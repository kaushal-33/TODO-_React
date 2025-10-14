import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../features/todoSlice";

const TodoForm = () => {

    const [input, setInput] = useState({
        task: "",
        priority: "",
    })
    const { user } = useSelector(state => state.authUser)
    console.log(user)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo({ input: input, uId: user.uid }))
    }

    return (
        <div className="w-full max-w-lg mx-auto mt-8 rounded-lg shadow-lg p-8 bg-white">
            <h2 className="text-2xl font-bold mb-6 text-primary text-center">Add a New Task</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-1">Task</label>
                    <input
                        type="text"
                        id="task"
                        name="task"
                        placeholder="Enter task"
                        required
                        value={input.task}
                        onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    />
                </div>
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                        name="priority"
                        id="priority"
                        required
                        value={input.priority}
                        onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    >
                        <option value="">Select priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-950 transition duration-200"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TodoForm;
