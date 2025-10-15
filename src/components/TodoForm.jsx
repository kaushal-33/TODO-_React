import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../features/todoSlice";
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
        <div className="w-full pt-[70px]">
            <form className="flex justify-between items-center" onSubmit={handleSubmit}>
                <div className="w-4/12 form-input">
                    <input
                        type="text"
                        id="task"
                        name="task"
                        placeholder="Enter task"
                        required
                        value={input.task}
                        onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                        className="w-full px-4 py-2  focus:outline-none bg-transparent text-white text-2xl"
                    />
                </div>
                <div className="w-4/12 form-input">
                    <select
                        name="priority"
                        id="priority"
                        required
                        value={input.priority}
                        onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                        className="w-full px-4 py-2 focus:outline-none bg-transparent text-gray-300 text-2xl"
                    >
                        <option value="" className="text-green-950" disabled>Select priority</option>
                        <option value="high" className="text-green-950 bg-red-200">High</option>
                        <option value="medium" className="text-green-950 bg-yellow-200">Medium</option>
                        <option value="low" className="text-green-950 bg-green-200">Low</option>
                    </select>
                </div>
                <div className="w-3/12">
                    <button
                        type="submit"
                        className="w-full submit-btn text-gray-300 py-2 text-2xl bg-green-950 hover:bg-transparent transition duration-200"
                    >
                        {id ? "Update Task" : "Add Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TodoForm;
