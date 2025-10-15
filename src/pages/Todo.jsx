import { useSelector } from 'react-redux'
import TodoForm from '../components/TodoForm'
import TodoTable from '../components/TodoTable'

const Todo = () => {
    const { user } = useSelector(state => state.authUser)
    console.log(user)
    return (
        <main>
            <section className='relative h-screen'>
                <img src="/images/board.png" alt="board image" className='w-full absolute top-0 left-0 -z-10 h-full' />
                <div className="h-full w-10/12 mx-auto">
                    <TodoForm />
                    <TodoTable />
                    <div className='mt-3 flex justify-between px-3'>
                        <h2 className='text-gray-300 font-mono'> {user.email} </h2>
                        <button className='stroke px-3 pt-1 text-xl font-bold text-green-950'>
                            Exit
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Todo
