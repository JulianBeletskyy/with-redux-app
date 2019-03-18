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
    popularBlogs: [],
    stories: [],
    story: {},
    testimonials: [
        {
            text: "Hello! I went to Ukraine to meet my lady in the springtime and it was great. I landed and my translator Marina met me at the airport, and helped me with everything the entire trip. She was great. I got to meet my lady and spend time with her. We seen the city and other cities all over Ukraine. We got to eat at many places trying many new foods all are delicious. All the people are helpful and very friendly. To anyone thinking of going I highly recommend it. It was an experience I will never forget. Duncan from Canada.",
            name: "Duncan",
            img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/Duncan.jpg",
            text_img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/Duncan2.jpg",
        }, {
            text: "On a recent tour to Kharkov, I had the good fortune to have Karina as Lifeinlove recommended to me by a friend who lives in Kharkov. She assured me that I could trust Karina to look out for my best interests and to be professional in all matters. Karina not only met her recommendation, but exceeded it. I could not have been happier or better served with my introductions, interpreting and all of the myriad details that arise when you’re in a foreign city and looking to make that perfect impression on the lady you’re hoping will be the one. George from USA.",
            name: "George",
            img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/George.jpg",
            text_img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/George2.jpg",
        }, {
            text: "My trip to Kharkov was very pleasant. The translator was wonderful. She was very helpful and knowledgeable to places of interest and excellent place to eat. She was very amazing in making everyone feel easy. The time I spent with my lady was fun and amazing. The services of the people were excellent and I highly recommend coming and enjoying a wonderful city and wonderful people. John",
            name: "John",
            img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/John.jpg",
            text_img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/John2.jpg",
        }, {
            text: "What to pay attention to during your meeting with your Ukrainian Woman.During the first meeting of course, you want to impress your lady and learn more about her to develop an in-person relationship.  You will be very excited and your feelings will be high, but remember to just be yourself. Now that you have met her, what should you look for in her during your meeting? First, I think it is very important to be yourself.  You should show your lady attention, respect, kindness, and speak about family.  She should in turn show you theses same qualities.  There are a few little things that I noticed during my meeting and will most likely be the same for you.  First, during pictures she will lean in closer to you.  A Ukrainian woman may take longer to tell you her feelings, but her actions will show you.  Also, pay attention after your first couple of dates to see if she also will hold your hand.  If she reaches for your hand and holds it tight, chances are she really likes you.  She will start to show little signs of affection. Does she make time to meet you during your visit from work? It is important to understand if she misses work to be with you, she is going out of her way to see you.  She will not be paid by her work and money is tight.  This is another good sign too look for.  Also, after your first couple of dates she will want your private details to contact you.  Don’t push her, let her decide if she wants to do exchange details.  I can assure you if she wants too, then there is interest.   If your lady refers to you as my “your name“, then she has decided that she is with you. Another important aspect of her life is her friends and family, once you learn more about her, you will see if she is family oriented, not just in words.   Most Ukrainian women are very family oriented and have close friends.  This reflects who they are every day.    If she wants you to meet her friends or family, she is interested in you for a long-term relationship.  Even though there may be language difficulties, don’t let that bother you.  Remember, just be yourself and respectful always.  The most important thing I can tell you is not to look for too much at first.   Just enjoy each others company and see if the bond you have started gets stronger during your dates. The women of Ukraine are strong and beautiful and each one is different. Good Luck and Enjoy! John D. from USA.",
            name: "John",
            img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/John-2.jpg",
            text_img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/John-22.jpg",
        }, {
            text: "My trip to Ukraine Kharkiv, was very exciting. I spent great time with my lady and daughter. Translator Karina was great and made for an exciting trip. Also she helped find great compatibility. I was able to see the whole city Kharkiv with my lady. Just an extraordinary amount of fun. James P. USA",
            name: "James",
            img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/james-2.png",
            text_img: "https://d2etktq4v0899q.cloudfront.net/static/assets/img/testimonials/james.png",
        }
    ],
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
        membership: false,
        paypal: false,
        subscribe: false,
        videoRequestMessage: false,
        subscribeMobile: false,
    },
    showRegistration: false,
    tab: {
        main: 'viewed',
        mail: 'incoming',
        profile: 'info',
        edit: 'info',
    },
    redirect: '',
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