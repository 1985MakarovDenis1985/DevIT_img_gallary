import {ADD_IMG} from "../types"
import {REMOVE_IMG} from "../types";

const initiallyState = {
    images: []
}

export const imgReducer = (state = initiallyState, action) => {
    switch (action.type) {
        case ADD_IMG :
            return {...state, images: state.images.concat(action.payload)}

        case REMOVE_IMG :
            return {...state, images: state.images.filter((el, index)=>index != +action.payload)}

        default :
            return state
    }
}
