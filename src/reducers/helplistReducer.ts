import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TicketWithId } from '../types/ticket'

export type HelplistState = {
    helplist: {[courseKey: string]: Array<TicketWithId>},
    isConnected: boolean,
    isLoadedCourse: {[key: string]: boolean}
}

const initialState = {
    helplist: {},
    isConnected: false,
    isLoadedCourse: {}
}

const helplistReducer = createSlice({
    name: 'helplist',
    initialState,
    reducers: {
        setHelplist: (
            state: HelplistState,
            { payload }: PayloadAction<{key: string, tickets: Array<TicketWithId>}>
        ) => {
            state.helplist = {
                ...state.helplist, 
                [payload.key]: [...state.helplist[payload.key] ?? [], ...payload.tickets]
            }
        },
        filterHelplist: (
            state: HelplistState,
            { payload }: PayloadAction<{courseKey: string, ticketId: string}>
        ) => {
            const filtered = state.helplist[payload.courseKey].filter(({ Id }) => Id !== payload.ticketId)
            state.helplist = {
                ...state.helplist,
                [payload.courseKey]: filtered
            }
        },
        updateTicket: (
            state: HelplistState,
            { payload }: PayloadAction<{courseKey: string, ticket: TicketWithId}>
        ) => {
            const filtered = state.helplist[payload.courseKey].map((t) => {
                if (t.Id === payload.ticket.Id) {
                    return payload.ticket
                }
                return t
            })
            state.helplist = {
                ...state.helplist,
                [payload.courseKey]: filtered
            }
        },
        setIsConnected: (
            state: HelplistState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.isConnected = payload
        },
        setIsLoaded: (
            state: HelplistState,
            { payload }: PayloadAction<{key: string, isLoaded: boolean}>
        ) => {
            state.isLoadedCourse = {
                ...state.isLoadedCourse, 
                [payload.key]: payload.isLoaded
            }
        }
    }

})

export const { actions, reducer } = helplistReducer