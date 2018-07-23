const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/main.vue'], resolve)
    },
    {
        path: '/content',
        meta: {title: 'nav'},
        component: (resolve) => require(['./views/addDream.vue'], resolve)
    },
    {
        path: '/classX',
        meta: {title: 'X 类梦境'},
        component: (resolve) => require(['./views/dreams/classX.vue'], resolve)
    },
    {
        path: '/classB',
        meta: {title: 'B类梦境'},
        component: (resolve) => require(['./views/dreams/classB.vue'], resolve)
    },
    {
        path: '/classC',
        meta: {title: 'C类梦境'},
        component: (resolve) => require(['./views/dreams/classC.vue'], resolve)
    },
    {
        path: '/classD',
        meta: {title: 'D类梦境'},
        component: (resolve) => require(['./views/dreams/classD.vue'], resolve)
    },
    {
        path: '/classE',
        meta: {title: 'E类梦境'},
        component: (resolve) => require(['./views/dreams/classE.vue'], resolve)
    }
];
export default routers;