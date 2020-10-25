import {DB_TRUE, DB_FALSE} from "../types"

const initiallyState = {
    db: false
}

export const indexDB_reducer = (state = initiallyState, action) => {
    switch (action.type) {
        case DB_TRUE :
            return {
                db: true
            }
        case DB_FALSE :
            return {
                db: false
            }
        default :
            return state
    }
}
