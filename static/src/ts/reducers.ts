import * as _ from "lodash";
import { routerReducer } from 'react-router-redux'
import { Action, combineReducers } from "redux";

const settingsReducer = (state = {}, action: {[id: string]: any}): {[id: string]: any} => {
    switch (action["type"]) {
        case "SET_SETTING":
            return {
                ...state,
                ...action["payload"]
            };
        
        case "CLEAR_SETTING":
            const newState = {...state};

            delete newState[action["payload"]];

            return newState;

        default:
            return state;
    }
}

const userReducer = (state = {}, action: {[id: string]: any}): {[id: string]: any} => {
    switch (action["type"]) {
        case "IMPORT_USERS":
            if (action["payload"].constructor !== Array) {
                action["payload"] = [action["payload"]];
            }

            return {
                ...state,
                ..._.keyBy(action["payload"], (object: {[id: string]: any}) => object["id"])
            };
        
        case "DELETE_USER":
            const newState = {...state};

            delete newState[action["payload"]];

            return newState;

        default:
            return state;
    }
}

export const allReducers = combineReducers({
    router: routerReducer,
    settings: settingsReducer,
    user: userReducer
});
