import * as types from '../actions/types.js'

const initialState = {
    isServer: typeof window === 'undefined',
    blogs: {
        list: [],
        current_page: 1,
        total: 1
    },
    blog: {
        title: '',
        comments: [],
    },
	messages: [],
    modals: {
        registration: false,
        login: false,
        recovery: false,
        avatar: false,
        photo_preview: false,
        plans: false,
        credits: false,
        video: false,
        gallery: false,
        support: false,
        testimonials: false,
        message: false,
    },
    showRegistration: false,
    tab: {
        main: 'viewed',
        mail: 'incoming',
        profile: 'info',
        edit: 'info',
    },
}

export default function ui(ui = initialState, action = {}) {
    switch (action.type) {
        case types.SET_BLOGS:
        	return Object.assign({}, ui, {
        		blogs: {
                    list: action.data.data,
                    current_page: action.data.current_page,
                    total: action.data.from,
                }
        	})
        case types.SET_UI_KEY:
            return Object.assign({}, ui, {
                [action.key]: action.data
            })
        case types.SHOW_ALERT:
            let tempMessages = Object.assign([], ui.messages)
            tempMessages.push({ 'text': action.text, 'level': action.level, 'timeout': action.timeout })
            return Object.assign({}, ui, {
                messages: tempMessages
            });
        case types.REMOVE_ALERT:
            return Object.assign({}, ui, {
                messages: []
            });
        case types.SET_ACTIVE_TAB:
            return Object.assign({}, ui, {
                tab: {...ui.tab, [action.tabKey]: action.key}
            });
        case types.TOGGLE_MODAL:
            let modals = Object.assign({}, ui.modals)
            modals[action.key] = action.value
            return Object.assign({}, ui, {
               modals
            });
        default:
            return ui;
    }
}