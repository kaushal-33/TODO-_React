import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { completeTodo, deleteTodo, fetchTodo } from "../features/todoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const TodoTable = () => {
    const { todoArr } = useSelector(state => state.todo);
    const { user } = useSelector(state => state.authUser);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const filteredArr = useMemo(() => {
        return [...todoArr].sort((a, b) => a.status - b.status)
    }, [todoArr]);
    console.log(filteredArr)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodo(user?.uid));
    }, [])

    return (
        <div className="w-full max-w-64xl mx-auto mt-6 sm:mt-8 md:mt-10 shadow-lg overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead className="text-green-950">
                    <tr className="">
                        <th className="p-2 sm:p-3 text-left text-xs sm:text-sm md:text-2xl font-medium"><span className="stroke">Task</span></th>
                        <th className="p-2 sm:p-3 text-center text-xs sm:text-sm md:text-2xl font-medium"><span className="stroke">priority</span></th>
                        <th className="p-2 sm:p-3 text-center text-xs sm:text-sm md:text-2xl font-medium"><span className="stroke">status</span></th>
                        <th className="p-2 sm:p-3 text-center text-xs sm:text-sm md:text-2xl font-medium"><span className="stroke">actions</span></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArr?.map((todo) => (
                        <tr
                            key={todo.id}
                            className={`border-dashed border-green-950 border-b-2 last:border-none transition-all`}
                        >
                            <td className="p-2 sm:p-3 text-xs sm:text-sm md:text-lg truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]">
                                {todo.task}
                            </td>
                            <td className="p-2 sm:p-3 text-center">
                                <span
                                    className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold capitalize ${todo.priority === 'high'
                                        ? 'bg-red-100 text-red-600'
                                        : todo.priority === 'medium'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-green-100 text-green-700'
                                        }`}
                                >
                                    {todo.priority}
                                </span>
                            </td>
                            <td className="p-2 sm:p-3 text-center text-xs sm:text-sm md:text-base capitalize">
                                {todo.status === 0 ? 'pending' : 'completed'}
                            </td>
                            <td className="p-2 sm:p-3 flex items-center justify-center gap-1 sm:gap-2">
                                {todo.status === 0 && (
                                    <button
                                        onClick={() => dispatch(completeTodo({ uId: user?.uid, updateId: todo.id }))}
                                        className="p-1 text-blue-700 hover:bg-blue-200 transition-colors"
                                        title="Mark as Complete"
                                        aria-label="Mark task as complete"
                                    >
                                        <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                )}
                                {todo.status === 0 && (
                                    <button
                                        onClick={() => navigate(`/${todo.id}`)}
                                        className="p-1 text-yellow-700 hover:bg-yellow-200 transition-colors"
                                        title="Edit"
                                        aria-label="Edit task"
                                    >
                                        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (id) {
                                            alert("can not delete task while updating...!")
                                            return;
                                        }
                                        dispatch(deleteTodo({ uId: user?.uid, deleteId: todo.id }))
                                    }}
                                    className="p-1 text-red-600 hover:bg-red-200 transition-colors"
                                    title="Delete"
                                    aria-label="Delete task"
                                >
                                    <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoTable