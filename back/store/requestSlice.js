import { createSlice } from '@reduxjs/toolkit';


export const requestSlice = createSlice({
    name: 'request',
    initialState: {
        message: '',
        responseSent: false,
        status: 'idle',  // idle, connecting, connected, disconnected, retrying, failed
        errorMessage: null,  // To track errors if needed
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setResponseSent: (state, action) => {
            state.responseSent = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
            if (action.payload === 'connected' || action.payload === 'disconnected') {
                state.errorMessage = null;  // Clear error on reconnect
            }
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearState: (state) => {
            state.message = '';
            state.responseSent = false;
            state.status = 'idle';
            state.errorMessage = null;
        }
    },
});


export const { setMessage, setResponseSent, setStatus, setErrorMessage, clearState } = requestSlice.actions;


export const selectRequest = (state) => state.request;


export default requestSlice.reducer;


