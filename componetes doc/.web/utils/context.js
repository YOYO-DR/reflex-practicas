import { createContext } from "react"
import { Event, hydrateClientStorage } from "/utils/state.js"

export const initialState = {"is_hydrated": false, "items": ["Write Code", "Sleep", "Have Fun"], "new_item": ""}
export const StateContext = createContext(null);
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}
export const initialEvents = [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
]