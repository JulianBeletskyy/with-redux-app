import * as types from '../actions/types.js'
import Cookies from 'js-cookie'

const initialState = {
    token: Cookies.get('token'),
    role: 'client',
    testing: false,
    openSocket: false,
    timeout: false,
    recoveryHash: '',
    onlineUsers: [],
    data: {
        role: 'client',
        hidden: false,
        hidden_request: false,
        active: true,
        profile_id: '',
        zodiac: '',
        weight: {},
        want_children: {},
        smoke: '',
        russian_language: '',
        profession: '',
        primary_language: '',
        occupation: '',
        mobile: '',
        message: '',
        marital_status: {},
        last_name: '',
        first_name: '',
        interests: [],
        interests_value: [],
        id: '',
        height: {},
        hair_length: {},
        hair_color: {},
        find_ethnicity: [],
        find_ethnicity_value: [],
        eyes: {},
        ethnicity: {},
        english_language: '',
        email: '',
        drink: '',
        country: '',
        city: '',
        children: {},
        age: '',
        birth: {},
        about_children: '',
        match: {},
        avatar: {},
        temp_avatar: '',
        cropped_data: {},
        education_id: '',
        smoke_id: '',
        primary_language_id: '',
        english_language_id: '',
        russian_language_id: '',
        drink_id: '',
        credits: 0,
        view_profile: 0,
        membership: {
            value: {}
        },
        membership_count: {},
        active_gallery: 'main',
        selected_img: [],
        images: [],
        video: [],
        body_style: {},
        eye_wear: {},
        religion: {},
        living_situation: {},
        education: {},
        field_of_work: {},
        employment_status: {},
        about_me: '',
        like_to_meet: '',
        about_family: '',
        leisure_time: '',
        future_goals: '',
        facebook: '',
        vk: '',
        other_social: '',
        languages: [],
        count_interest: 0,
        count_favorite: 0,
        unread_message: 0,
        gallery: [],
    },
}

const user = (user = initialState, action = {}) => {
    let temp = Object.assign([], user.data)
    switch (action.type) {
        case types.SET_TOKEN:
            return Object.assign({}, user, {
                token: action.token
            });
        case types.REMOVE_TOKEN:
            return Object.assign({}, user, {
                token: false
            });
        case types.SET_USER_INFO:
            let testing = user.testing
            if (action.data && action.data.id === 286) {
                testing = true
            }
            return Object.assign({}, user, {
                testing: testing,
                data: {...user.data, ...action.data}
            })
        case types.SET_RECOVERY_HASH:
            return Object.assign({}, user, {
                recoveryHash: action.value
            });
        case types.SET_OPEN_SOCKET:
            return Object.assign({}, user, {
                openSocket: action.value
            });
        case types.ROTATE_IMG_GALLERY:
            const gallery = user.data.gallery.map(item => {
                if (item.id === action.id) {
                    item.angle = action.angle
                }
                return item
            })
            return Object.assign({}, user, {
                data: {...user.data, gallery}
            })
        case types.SET_ONLINE_USERS:
            return Object.assign({}, user, {
                onlineUsers: action.userIds,
            })
        case types.ADD_ONLINE_USERS:
            return Object.assign({}, user, {
                onlineUsers: [...user.onlineUsers, action.id],
            })
        case types.REMOVE_ONLINE_USERS:
            return Object.assign({}, user, {
                onlineUsers: user.onlineUsers.filter(id => id !== action.id),
            })
        default:
            return user;
    }
}

export default user