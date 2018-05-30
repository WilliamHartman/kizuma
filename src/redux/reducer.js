import axios from 'axios';

const initialState = {
    user: {},
    currentPage: 'home'
}

const GET_USER_DATA = 'GET_USER_DATA'; 
const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE'; 


export function getUserData(){
    const user = axios.get('/auth/me').then(res => res.data);
    return {
        type: GET_USER_DATA,
        payload: user
    }
}

export function updateCurrentPage(newPage){
    return {
        type: UPDATE_CURRENT_PAGE,
        payload: newPage
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return Object.assign({}, state, { user: action.payload });
        case UPDATE_CURRENT_PAGE:
            return Object.assign({}, state, { currentPage: action.payload });
        default:
            return state;
    }
}