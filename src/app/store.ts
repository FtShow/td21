import {addTaskSaga, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer, initializeAppSaga} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer'
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'
import {fetchTasks, removeTaskSaga} from "../features/TodolistsList/Todolist/tasks-sagas";

function * rootWatcher (){
    yield takeEvery('INITIALIED-APP', initializeAppSaga)
    yield takeEvery('TASK/FETCH-TASKS', fetchTasks)
    yield takeEvery('REMOVE-TASK', removeTaskSaga)
    yield takeEvery('CREATE-TASK', addTaskSaga)
}
function * rootWorker (){
    alert()
}
setTimeout(()=>{
    // @ts-ignore
    store.dispatch({type: 'ACTIVATOR-ACTION-TYPE'})
}, 2000)

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
const sagaMiddleware = createSagaMiddleware()
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

sagaMiddleware.run(rootWatcher)
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
