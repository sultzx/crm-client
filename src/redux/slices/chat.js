import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCreateChat = createAsyncThunk('chats/fetchCreateChat', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/chat', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})


export const fetchCreateMessage = createAsyncThunk('chats/fetchCreateMessage', async ({chat_id, sender, content}, {rejectWithValue}) => {
    try {
        const  response  = await axios.post(`/api/chat/${chat_id}/message`, {sender, content})
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchMessageAll = createAsyncThunk('chats/fetchMessageAll', async () => {
    const { data } = await axios.get('/api/chat/message/all')    
    return data
})

/////////////////////////////////////////////////////

export const fetchChatAll = createAsyncThunk('chats/fetchChatAll', async () => {
    const { data } = await axios.get('/api/chat/all')    
    return data
})

export const fetchChatOne = createAsyncThunk('chats/fetchChatOne', async ({id}, {rejectWithValue}) => {
    try {
        const  response  = await axios.get('/api/chat/' +  id)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})


const initialState = {
    chats: {
        items: [],
        status: 'loading',
        error: '' 
    } ,
    data: null,
    status: 'loading',
    error: '',
    messages: {
        items: [],
        status: 'loading',
        error: '' 
    } ,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
    },
    
    extraReducers: {

        [fetchChatAll.pending]: (state) => {
            state.chats.status = 'loading'
            state.chats.items = null
        },
        [fetchChatAll.fulfilled]: (state, action) => {
            state.chats.status = 'loaded'
            state.chats.items = action.payload
        },
        [fetchChatAll.rejected]: (state) => {
            state.chats.status = 'error'
            state.chats.items = null
        },

        [fetchMessageAll.pending]: (state) => {
            state.messages.status = 'loading'
            state.messages.items = null
        },
        [fetchMessageAll.fulfilled]: (state, action) => {
            state.messages.status = 'loaded'
            state.messages.items = action.payload
        },
        [fetchMessageAll.rejected]: (state) => {
            state.messages.status = 'error'
            state.messages.items = null
        },

        
        [fetchChatOne.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchChatOne.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchChatOne.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },


        [fetchCreateChat.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchCreateChat.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchCreateChat.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

    }
})

export const chatReducer = chatSlice.reducer

