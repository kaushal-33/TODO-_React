import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { completeTodo, deleteTodo, fetchTodo } from "../features/todoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const TodoTable = () => {
    const { todoArr } = useSelector(state => state.todo);
    const { user } = useSelector(state => state.authUser);
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id)
    const filteredArr = useMemo(() => {
        return [...todoArr].sort((a, b) => a.status - b.status)
    }, [todoArr]);
    console.log(filteredArr)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodo(user?.uid));
    }, [])

    return (
        <div className="w-full max-w-64xl mx-auto mt-6  overflow-x-auto overflow-y-auto h-[calc(100vh-330px)] md:h-[calc(100vh-275px)]">
            <table className="min-w-full table-auto">
                <thead className="text-green-950 shadow-lg sticky top-0 z-20">
                    <tr className="">
                        <th className="p-2 sm:p-4 text-left text-xs sm:text-sm md:text-2xl"><span className="stroke">Task</span></th>
                        <th className="p-2 sm:p-4 text-center text-xs sm:text-sm md:text-2xl"><span className="stroke">priority</span></th>
                        <th className="p-2 sm:p-4 text-center text-xs sm:text-sm md:text-2xl"><span className="stroke">status</span></th>
                        <th className="p-2 sm:p-4 text-center text-xs sm:text-sm md:text-2xl"><span className="stroke">actions</span></th>
                    </tr>
                </thead>
                <tbody className="">
                    {filteredArr?.map((todo) => (
                        <tr
                            key={todo.id}
                            className={`border-dashed border-green-950 border-b-2 transition-all`}
                        >
                            <td className={`${todo.status === 1 && "line-through"} p-2 font-bold text-xs sm:text-sm md:text-lg truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]`}>
                                {todo.task}
                            </td>
                            <td className="p-2 text-center">
                                <span
                                    className={`font-bold text-xs md:text-lg capitalize`}
                                >
                                    {todo.priority}
                                </span>
                            </td>
                            <td className="p-2 text-center font-bold text-xs sm:text-sm md:text-base capitalize">
                                {todo.status === 0 ? 'pending' : 'completed'}
                            </td>
                            <td className="p-2 flex items-center justify-center gap-1 sm:gap-2">
                                {todo.status === 0 && (
                                    <button
                                        onClick={() => dispatch(completeTodo({ uId: user?.uid, updateId: todo.id }))}
                                        className="p-1 text-green-600"
                                        title="Mark as Complete"
                                        aria-label="Mark task as complete"
                                    >
                                        <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                )}
                                {todo.status === 0 && (
                                    <button
                                        onClick={() => navigate(`/${todo.id}`)}
                                        className="p-1 text-blue-500"
                                        title="Edit"
                                        aria-label="Edit task"
                                    >
                                        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (id) {
                                            toast.error("can not delete task while updating...!");
                                            return;
                                        }
                                        dispatch(deleteTodo({ uId: user?.uid, deleteId: todo.id }))
                                    }}
                                    className="p-1 text-red-700"
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