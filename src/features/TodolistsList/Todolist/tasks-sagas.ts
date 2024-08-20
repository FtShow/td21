import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../../app/app-reducer";
import {AxiosResponse} from "axios";
import {GetTasksResponse, todolistsAPI} from "../../../api/todolists-api";
import {setTasksAC} from "../tasks-reducer";

export function* fetchTasks(action: ReturnType<typeof fetchTasksActionAC>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<GetTasksResponse> = yield call(todolistsAPI.getTasks, action.todolistId)
    const tasks = res.data.items
    yield put(setTasksAC(tasks, action.todolistId))
    yield put(setAppStatusAC('succeeded'))

}

export function* removeTaskSaga(action: ReturnType<typeof removeTaskAC>) {
    yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId)
    yield put(removeTaskAC(action.taskId, action.todolistId))
}

export const fetchTasksActionAC = (todolistId: string) => {
    return {
        type: 'TASK/FETCH-TASKS',
        todolistId
    } as const
}
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)