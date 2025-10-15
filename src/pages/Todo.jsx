import TodoForm from '../components/TodoForm'
import TodoTable from '../components/TodoTable'

const Todo = () => {
    return (
        <main>
            <section className='relative h-screen'>
                <img src="/images/board.png" alt="board image" className='w-full absolute top-0 left-0 -z-10 h-full' />
                <div className="h-full w-10/12 mx-auto">
                    <TodoForm />
                    <TodoTable />
                </div>
            </section>
        </main>
    )
}

export default Todo
