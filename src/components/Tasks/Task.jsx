import './task.scss'

function Task({task, handleChangeStatus, handleDeleteTask, handleContentEditable}) {
    const {id, name, status} = task;

    
    return (
        <li key={id} className={status ? 'task done' : 'task'}>
            <i
                className='taskStatus'
                onClick={() => {
                    handleChangeStatus(task)
                }}
            >
            </i>
            <span
                className='taskName'
                contentEditable
                onBlur={(event) => handleContentEditable(event, task)}
            >
                {name}
            </span>
            <button className='taskDeleteBtn' onClick={() => handleDeleteTask(task)}>x</button>
        </li>
    );
}

export default Task;