import {Bite, Slice} from '@seijs/redux-hang-on'
import { loadItems } from './_api'

const initialState = {
    items: [],
    loading: false
}

const loadStaffBite = Bite({
        start: (state, payload) => {
            state.loading = true
        },
        done: (state, payload) => {
            state.items = payload 
            state.loading = false 
        }
    },
    {
        triggerStatus:  'start',
        updateOn: ['loadStaff'],
        canTrigger: ['loadStaff'],
        script: LoadItemsScript,
        instance: 'refreshing',
        customOpts: {
            loader: loadItems
        }
})

export const trivialSlice = Slice('trivial', {
    'loadItems': loadStaffBite
}, initialState)
