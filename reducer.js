export const initialState = {
    restname: '',
    user: null,
    favorites: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_RESTAURANT':
            return { ...state, restname: action.restname };
            break;
        case 'SET_USER':
            return { ...state, user: action.user };
            break;
        case 'ADD_FAVORITE':
            return { ...state, favorites: [...state.favorites, action.favorite] }
            break;
        default:
            return state;
    }
}

export default reducer;