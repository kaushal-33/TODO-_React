import { useDispatch, useSelector } from 'react-redux'
import TodoForm from '../components/TodoForm'
import TodoTable from '../components/TodoTable'
import { logOut } from '../features/authSlice'

const Todo = () => {
    const { user } = useSelector(state => state.authUser)
    // console.log(user)
    const dispatch = useDispatch();
    return (
        <main>
            <section className='relative h-screen'>
                <img src="/images/board.png" alt="board image" className='w-full absolute top-0 left-0 -z-10 h-full' />
                <div className="h-full w-10/12 mx-auto">
                    <TodoForm />
                    <TodoTable />
                    <div className='flex justify-between px-3'>
                        <h2 className='text-gray-300'> {user.email} </h2>
                        {user.displayName && <div className='text-gray-300'>
                            {user.displayName}'s TODO
                        </div >}
                        <button className='stroke ps-3 pt-1 text-xl font-bold text-green-950' onClick={() => dispatch(logOut())}>
                            Exit
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Todo
