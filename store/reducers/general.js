import * as at from '../actions/actionTypes';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    value: 0,
    countLoading: 0,
    isLoading: false,
    sendNotification: null,
    unauthorized: false,
    notify: {
        listener: 0,
        config: {}
    },
}

// create your reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        
        case at.HANDLER_LOADING:
            const countLoading = state.countLoading
            const number = action.value ? 1 : -1
            const newCountLoading = (countLoading + number) < 0 ? 0 : (countLoading + number)
            const isLoading = !(newCountLoading === 0)
            return {
                ...state,
                isLoading: isLoading,
                countLoading: newCountLoading
            }
        case at.SET_LOADING:
            return {
                ...state,
                isLoading: action.value
            }
        case at.PUSH_NOTIFICATION:
            const counter = state.notify.listener + 1
            return {
                ...state,
                notify: {
                    listener: counter,
                    config: action.config
                }
            }
        case at.INCREMENT_COUNTER:
            return { ...state, value: state.value + 1 };
        case at.DECREMENT_COUNTER:
            return { ...state, value: state.value - 1 };
        default:
            return { ...state };
    }
};

export default reducer
