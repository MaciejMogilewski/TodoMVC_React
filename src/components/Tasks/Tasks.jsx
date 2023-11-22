import './tasks.scss'
import Task from "./Task.jsx";

function Tasks({tasks, filter, handleChangeStatus, handleDeleteTask, handleContentEditable}) {
    return (
        <ul className='tasks'>
            {tasks
                .filter((task) => filter === 'all' ? true : filter === task.status)
                .map((task) => (
                    <Task
                        key={task.id}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                        task={task}
                        handleContentEditable={handleContentEditable}
                    />
                ))}
        </ul>
    );
}

export default Tasks;