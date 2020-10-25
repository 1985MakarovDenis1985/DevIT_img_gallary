import {ADD_COLLECTION, REMOVE_IMG} from "../types"

const initiallyState = {
    images: []
}

export const copyGalleryForSearch = (state = initiallyState, action) => {
    switch (action.type) {

        case REMOVE_IMG :
            return {...state, images: state.images.filter((el, index)=>el.name != action.payload)}

        case ADD_COLLECTION :
            return {...state, images: action.payload}

        default :
            return state
    }
}
