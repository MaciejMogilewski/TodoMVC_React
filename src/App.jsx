import {useEffect, useState} from "react";
import {Header} from "./components/Header/Header.jsx";
import InputWrapper from "./components/InputWrapper/InputWrapper.jsx";
import Tasks from "./components/Tasks/Tasks.jsx";
import {TaskCounter} from "./components/TaskCounter/TaskCounter.jsx";
import {Filters} from "./components/Filters/Filters.jsx";
import {ClearCompleted} from "./components/ClearCompleted/ClearCompleted.jsx";
import {addTaskApi, getAllTasksApi} from "./helpers/api.js";

function* genId() {
    let id = 0;
    while (true) {
        yield id;
        id++;
    }
}

const nextId = genId();

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all')
    const [doneAll, setDoneAll] = useState(false);

    useEffect(() => {
            const controller = new AbortController();

            getAllTasksApi(controller.signal).then(setTasks);

            return () => {
                controller.abort();
            }
        }, []);

    async function handleAddTask(value) {
            const task = await addTaskApi({name: value, status: false})
            setTasks([...tasks, task]);
    }

    function handleChangeStatus(task) {
        task.status = !task.status;
        setTasks([...tasks]);
    }

    function handleDeleteTask(taskToRemove) {
        setTasks(tasks.filter((task) => task !== taskToRemove));
    }

    function handleDeleteAllTask() {
        setTasks(tasks.filter((task) => !task.status));
    }

    function handleAllDone() {
        let done = tasks.every((task) => task.status === true);
        setTasks(tasks.map((task) => ({...task, status: !done})));
        setDoneAll(!done);
    }

    function handleContentEditable(event, taskToChange) {
        setTasks(tasks.map((task) => {
            if (task === taskToChange) {
                task.name = event.target.innerText;
            }
            return task;
        }))
    }

    return (
        <div>
            <Header/>
            <InputWrapper
                tasks={tasks}
                doneAll={doneAll}
                handleAllDone={handleAllDone}
                handleAddTask={handleAddTask}
            />
            {!!tasks.length && (
                <>
                    <Tasks
                        tasks={tasks}
                        filter={filter}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                        handleContentEditable={handleContentEditable}
                    />
                    <div>

                        <TaskCounter tasks={tasks} predicate={(task) => !task.status}/>
                        <Filters setFilter={setFilter}/>

                        {!!tasks.filter((task) => !task.status).length && (
                            <ClearCompleted onClick={handleDeleteAllTask}/>)}
                    </div>
                </>
            )}
        </div>
    )
}

export default App
