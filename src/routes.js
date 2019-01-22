import taProfile from './components/taProfile.vue';

export const routes = [
    {
        path: '/u/g/:profile_id',
        component: taProfile,
        name: 'ta-profile'
    },
    // {
    //     path: '/account',
    //     component: Account,
    //     name: 'account',
    //     children: [
    //         {
    //             path: 'login',
    //             component: Login,
    //             name: 'login'
    //         },
    //         {
    //             path: 'logout',
    //             component: Logout,
    //             name: 'logout'
    //         },
    //     ]
    // },
    // {
    //     path: '*',
    //     redirect: {name: 'home'},
    //     name: '404'
    // }
];
