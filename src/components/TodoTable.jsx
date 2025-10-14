import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { completeTodo, deleteTodo, fetchTodo } from "../features/todoSlice";
import { useNavigate } from "react-router-dom";

const TodoTable = () => {
    const { todoArr } = useSelector(state => state.todo);
    const { user } = useSelector(state => state.authUser);
    const navigate = useNavigate();
    const filteredArr = useMemo(() => {
       return [...todoArr].sort((a, b) => a.status - b.status)
    }, [todoArr]);
    console.log(filteredArr)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodo(user?.uid));
    }, [])

    return (
        <div className="w-full max-w-3xl mx-auto mt-10 rounded-lg shadow-lg bg-white overflow-x-auto">
            <table className="min-w-full table-auto rounded-lg">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="p-3 text-left font-medium text-gray-700">Task</th>
                        <th className="p-3 text-center font-medium text-gray-700">Priority</th>
                        <th className="p-3 text-center font-medium text-gray-700">Status</th>
                        <th className="p-3 text-center font-medium text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArr?.map((todo) => (
                        <tr key={todo.id} className={`border-b last:border-none transition hover:bg-blue-50 ${todo.completed ? 'opacity-60' : ''}`}>
                            <td className="p-3">{todo.task}</td>
                            <td className="p-3 text-center">
                                <span
                                    className={`px-3 py-1 rounded-2xl text-xs font-semibold ${todo.priority === 'high' ? 'bg-red-100 text-red-600' : todo.priority === 'medium'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-green-100 text-green-700'
                                        }`}
                                >
                                    {todo.priority}
                                </span>
                            </td>
                            <td className="p-3 text-center capitalize">
                                {todo.status === 0 ? "pending" : "completed"}
                            </td>
                            <td className="p-3 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => dispatch(completeTodo({ uId: user?.uid, updateId: todo.id }))}
                                    className="px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded"
                                    title="Mark as Complete"
                                >
                                    ✓
                                </button>
                                <button
                                    onClick={() => {
                                        navigate(`/${todo.id}`);
                                    }}
                                    className="px-2 py-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded"
                                    title="Edit"
                                >
                                    ✎
                                </button>
                                <button
                                    onClick={() => dispatch(deleteTodo({ uId: user?.uid, deleteId: todo.id }))}
                                    className="px-2 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded"
                                    title="Delete"
                                >
                                    🗑
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default TodoTable