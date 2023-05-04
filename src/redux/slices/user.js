import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/user/signin', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, {rejectWithValue}) => {
    try {
      const  response  = await axios.post('/api/user/signup', params)
        return response.data  
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }    
})

export const fetchUpdate = createAsyncThunk('auth/fetchUpdate', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/user/me/update', params)
          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})


export const fetchSetStatus = createAsyncThunk('auth/fetchSetStatus', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/user/set-status', params)
          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})
/////////////////////////////////////////////////////

export const fetchAuthMe= createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/api/user/me')    
    return data
})

/////////////////////////////////////////////////////

export const fetchGetAll = createAsyncThunk('auth/fetchGetAll', async () => {
    const { data } = await axios.get('/api/user/all')    
    return data
})




const initialState = {
    all_users: {
        items: [],
        status: 'loading',
        error: '' 
    } ,
    data: null,
    status: 'loading',
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'loaded'
        }
    },
    
    extraReducers: {

        [fetchGetAll.pending]: (state) => {
            state.all_users.status = 'loading'
            state.all_users.items = null
        },
        [fetchGetAll.fulfilled]: (state, action) => {
            state.all_users.status = 'loaded'
            state.all_users.items = action.payload
        },
        [fetchGetAll.rejected]: (state) => {
            state.all_users.status = 'error'
            state.all_users.items = null
        },


        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },


        [fetchLogin.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchLogin.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },


        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },

        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },

        [fetchRegister.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

        [fetchUpdate.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchUpdate.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdate.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

    }
})

export const selectIsAuth = (state) => Boolean(state.user.data)

export const userReducer = userSlice.reducer

export const { logout } = userSlice.actions
