import './inputWrapper.scss';
import InputTask from "./InputTask.jsx";
import ToggleStatuses from "../ToggleStatuses/ToggleStatuses.jsx";

function InputWrapper({value, handleAddTask, handleInput, handleAllDone, doneAll, tasks}) {
    return (
        <div className='inputWrapper'>
            {!!tasks.length && (
                <ToggleStatuses handleAllDone={handleAllDone} doneAll={doneAll}/>
            )}
            <InputTask
                value={value}
                handleAddTask={handleAddTask}
                handleInput={handleInput}
            />
        </div>
    );
}

export default InputWrapper;