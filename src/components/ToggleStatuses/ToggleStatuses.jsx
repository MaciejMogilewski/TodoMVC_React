import './toggleStatuses.scss';
// eslint-disable-next-line react/prop-types
function ToggleStatuses({handleAllDone, tasks}) {
    return (
        <i
            /* eslint-disable-next-line react/prop-types */
            className={tasks.every((task) => task.status === true) ? 'toggleStatuses done' : 'toggleStatuses'}
            onClick={handleAllDone}
        ></i>
    );
}

export default ToggleStatuses;