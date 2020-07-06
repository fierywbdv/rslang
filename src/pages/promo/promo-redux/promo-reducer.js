import { combineReducers } from "redux";

const { AUTORIZATION, DISAUTORIZATION } = require("./promo-types");

function registrationReducer(state = localStorage.getItem('authorized') || false, action) {
    if(action.type === AUTORIZATION) {
        return state = true;
    } else if(action.type === DISAUTORIZATION) {
        return state = false;
    }

    return state;
}

export const promoReducer = combineReducers({
    authorized: registrationReducer
})