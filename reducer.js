export const initialState = {
    restname: '',
    user: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_RESTAURANT':
            return { ...state, restname: action.restname };
            break;
        case 'SET_USER':
            return { ...state, user: action.user };
            break;
        default:
            return state;
    }
}

export default reducer;