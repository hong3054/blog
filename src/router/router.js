export const loginRouter = {
	path: '/login',
	name: 'login',
	meta: {
		title: '登录'
	},
	component: () =>
		import('@/views/login.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
	path: '/',
	name: 'otherRouter',
	redirect: '/home',
	component: Main,
	children: [{
			path: 'home',
			title: '首页',
			name: 'home_index',
			component: () =>
				import('@/views/home/home.vue')
		},
		{
			path: 'ownspace',
			title: '个人中心',
			name: 'ownspace_index',
			component: () =>
				import('@/views/own-space/own-space.vue')
		},
		{
			path: 'order/:order_id',
			title: '订单详情',
			name: 'order-info',
			component: () =>
				import('@/views/advanced-router/component/order-info.vue')
		}, // 用于展示动态路由
		{
			path: 'shopping',
			title: '购物详情',
			name: 'shopping',
			component: () =>
				import('@/views/advanced-router/component/shopping-info.vue')
		}, // 用于展示带参路由
		{
			path: 'message',
			title: '消息中心',
			name: 'message_index',
			component: () =>
				import('@/views/message/message.vue')
		}
	]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
		path: '/agent',
		icon: 'key',
		name: 'agent',
		title: '代理管理',
		component: Main,
		children: [{
			path: 'agent_index',
			title: '代理管理',
			name: 'agent_index',
			icon:'briefcase',
			component: () =>
				import('@/views/agent/agent.vue')
		},{
			path: 'addStaff',
			title: '添加人员',
			name: 'addStaff',
			icon:'person-add', 
			swUltronUserAccess:['admin','addPeople'],
			component: () =>
				import('@/views/addStaff/addStaff.vue')
		}]

	},
	{
		path: '/bill',
		icon: 'key',
		name: 'bill',
		title: '账单管理',
		component: Main,
		children: [{
			path: 'bill_index',
			title: '佣金列表',
			name: 'bill_index',
			icon:'ios-paper',
			component: () =>
				import('@/views/bill/bill.vue')
		},{
			path: 'cash',
			title: '提现列表',
			name: 'cash',
			icon:'social-yen',
			component: () =>
				import('@/views/bill/cash/cash.vue')
		},{
			path: 'withdrawing',
			title: '扣款列表',
			swUltronUserAccess:['admin','addMechanism'],
			name: 'withdrawing',
			icon:'ios-pie',
			component: () =>
				import('@/views/bill/withdrawing/withdrawing.vue')
		}]
	},
	{
		path: '/mechanism',
		icon: 'key',
		name: 'mechanism',
		title: '机构管理',
		component: Main,
		children: [{
			path: 'mechanism_index',
			title: '机构管理', 
			swUltronUserAccess:['admin','addMechanism'],
			name: 'mechanism_index',
			icon:'ios-people',
			component: () =>
				import('@/views/mechanism/mechanism.vue')
		},
		{
			path: 'binding',
			title: '绑卡列表', 
			name: 'binding',
			icon:'card',
			swUltronUserAccess:['admin','addMechanism'],
			component: () =>
				import('@/views/mechanism/binding/binding.vue')
		}]

	}
	
];


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
	loginRouter,
	otherRouter,
	preview,
	locking,
	...appRouter,
	page500,
	page403,
	page404
];