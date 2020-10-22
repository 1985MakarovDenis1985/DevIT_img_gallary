import {ADD_IMG,
    REMOVE_IMG,
    DB_FALSE,
    DB_TRUE
} from "../types";

export function setImg(img) {
    return {
        type: ADD_IMG,
        payload: img
    }
}

export function removeImg(index) {
    return {
        type: REMOVE_IMG,
        payload: index
    }
}

export function dbTrue() {
    return {
        type: DB_TRUE
    }
}

export function dbFalse() {
    return {
        type: DB_FALSE
    }
}