import { createStore } from "vuex"
import auth from "./auth"
import survey from "./survey"
import response from "./response"

export const store = createStore({
    modules: {
        auth,
        survey,
        response
    }
})