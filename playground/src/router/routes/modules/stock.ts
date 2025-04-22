import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'fluent-color:poll-32',
      order: 100,
      title: '股票',
    },
    name: 'Stock',
    path: '/stock',
    children: [
      {
        path: '/stock/operation',
        name: 'StockOperation',
        meta: {
          icon: 'fluent-color:calendar-edit-24',
          title: '操作记录',
        },
        component: () => import('#/views/stock/operation/list.vue'),
      },
    ],
  },
];

export default routes;
