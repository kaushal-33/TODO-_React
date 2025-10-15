import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setEditIdx, updateTodo } from "../features/todoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const TodoForm = () => {
    const [input, setInput] = useState({
        task: "",
        priority: "",
    })
    const { user } = useSelector(state => state.authUser);
    // const { todoArr } = useSelector(state => state.todo);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const obj = await getDoc(doc(db, user.uid, id))
                    setInput(obj.data());
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateTodo({ uId: user.uid, updateId: id, input: input, }));
            navigate("/");
        } else {
            dispatch(addTodo({ input: input, uId: user.uid }))
        }
        setInput({
            task: "",
            priority: "",
        })
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-primary text-center capitalize">{id ? "Update task" : "Add a New Task"}</h2>
            <form className="flex justify-between" onSubmit={handleSubmit}>
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
                        {id ? "Update Task" : "Add Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TodoForm;
