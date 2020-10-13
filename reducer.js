export const initialState = {
    restname: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_RESTAURANT':
            return { ...state, restname: action.restname };
            break;
        default:
            return state;
    }
}

export default reducer;