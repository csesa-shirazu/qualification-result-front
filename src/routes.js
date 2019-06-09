import Login from './components/account/Login.vue';
import Logout from './components/account/Logout.vue';
import Account from './components/account/Account.vue';
import taProfile from './components/taProfile.vue';
import CourseGroupTAs from './components/CourseGroupTAs.vue';
import Courses from './components/Courses.vue';
import NetworkSummerSchool from './components/NetworkSummerSchool.vue';

export const routes = [
    {
        path: '',
        component: Courses,
        name: 'courses'
    },
    {
        path: '/network-summer-school',
        component: NetworkSummerSchool,
        name: 'network-summer-school'
    },
    {
        path: '/c/g/:course_group_id',
        component: CourseGroupTAs,
        name: 'course-group-tas'
    },
    {
        path: '/u/g/:profile_id',
        component: taProfile,
        name: 'ta-profile'
    },
    {
        path: '/account',
        component: Account,
        name: 'account',
        children: [
            {
                path: 'login',
                component: Login,
                name: 'login'
            },
            {
                path: 'logout',
                component: Logout,
                name: 'logout'
            },
        ]
    },
    {
        path: '*',
        redirect: {name: 'courses'},
        name: '404'
    }
];
