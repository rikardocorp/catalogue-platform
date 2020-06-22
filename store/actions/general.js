import * as at from './actionTypes'

//Action Creator
export const incrementCounter = () => ({
    type: at.INCREMENT_COUNTER
});

export const decrementCounter = () => ({
    type: at.DECREMENT_COUNTER
});

export const handlerLoading = (value) => {
    return { type: at.HANDLER_LOADING, value: value }
}

export const setIsLoading = (value) => {
    return { type: at.SET_LOADING, value }
}

export const pushNotification = (config) => {
    return { type: at.PUSH_NOTIFICATION, config }
}


export const wrapperHttp = (
    { 
        methodReq = null, 
        notify = { success: true, error: true }, 
        authorized_persistent = false
    }) => (dispatch, getState) => {

    // VALID UNAUTHORIZED
    const unauthorized = getState().general.unauthorized
    if (unauthorized && !authorized_persistent) {
        return { success: false, content: 'Unauthorized' }
    }

    dispatch(handlerLoading(true))
    const promise = new Promise((resolve, reject) => {
        methodReq().then(response => {
            // console.log('REDUX AXIOS')
            // console.log(response)
            resolve(response)
        }).catch(error => {
            // console.log('REDUX AXIOS ERROR')
            // console.log(error)
            resolve(error)
        })
    })
    promise.then(() => {
        console.log('THEN')
        dispatch(handlerLoading(false))
    }).catch(() => {
        console.log('CATCH')
        dispatch(handlerLoading(false))
    })
    return promise
};
