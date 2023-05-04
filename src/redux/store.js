import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slices/user.js'
import { orderReducer } from './slices/order.js'
import { chatReducer } from './slices/chat.js'
import { departmentReducer } from './slices/department.js'
import { projectReducer } from './slices/project.js'


const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
        chat: chatReducer,
        department: departmentReducer,
        project: projectReducer
    }
})

export default store