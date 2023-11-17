import {useState} from "react";

function* genId() {
    let id = 0;
    while (true) {
        yield id;
        id++;
    }
}

const nextId = genId();

function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);

    function handleInput(event) {
        setValue(event.target.value);
    }

    function handleAddTask(event) {
        if (event.key === 'Enter') {
            setTasks([...tasks, {
                id: nextId.next().value,
                name: value,
                status: false
            }]);
            setValue('');
        }
    }

    function handleChangeStatus(task) {
        task.status = !task.status;
        setTasks([...tasks]);
    }

    function handleDeleteTask(taskToRemove) {
        setTasks(tasks.filter((task) => task !== taskToRemove));
    }

    return (
        <div>
            <h1>todos</h1>
            <div>
                <input
                    type="text"
                    onKeyUp={handleAddTask}
                    onChange={handleInput}
                    value={value}
                    placeholder='What needs to be done?'/>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <button onClick={() => {handleChangeStatus(task)}}>{`${task.status}`}</button>
                        <span>{task.name}</span>
                        <button onClick={() => handleDeleteTask(task)}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
