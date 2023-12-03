import './task.scss'
import {Link} from "react-router-dom";

function Task({task, handleChangeStatus, handleDeleteTask, handleContentEditable}) {
    const {id, name, status} = task;

    
    return (
        <li className={status ? 'task done' : 'task'}>
            <input
                type="checkbox"
                className='taskStatus'
                onClick={() => {
                    handleChangeStatus(task)
                }}
            >
            </input>
            <span
                className='taskName'
//                contentEditable
                onBlur={(event) => handleContentEditable(event, task)}
            >
                <Link to={`/details/${id}`}>{name}</Link>
            </span>
            <button className='taskDeleteBtn' onClick={() => handleDeleteTask(task)}>x</button>
        </li>
    );
}

export default Task;