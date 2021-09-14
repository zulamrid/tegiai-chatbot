const initialState = {
    datas_chat: [],
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_CHAT':
            return {
                ...state,
                datas_chat: state.datas_chat.concat(action.datas),
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: !state.isLoading,
            }
        default:
            return state
    }
}