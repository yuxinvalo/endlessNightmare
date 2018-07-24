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
    }
];
export default routers;