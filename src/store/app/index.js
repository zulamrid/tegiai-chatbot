const initialState = {
    datas_chat: [],
    isLoadingChat: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_CHAT':
            return {
                ...state,
                datas_chat: state.datas_chat.concat(action.datas),
                isLoadingChat: true,
            }
        case 'LOADING':
            return {
                ...state,
                isLoadingChat: false,
            }
        default:
            return state
    }
}