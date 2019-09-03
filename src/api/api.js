import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// 是否允许跨域
axios.defaults.withCredentials=true;

// axios初始化：延迟时间，主路由地址
let instance = axios.create({
    baseURL: 'https://easy-mock.com/mock/5b7bb6b9d02c1e7f50b4102f/example/',
    timeout: 10000,
  });

  export const getData = (getUrl, globeVue) => {
	return Promise.race([
		new Promise((resolve, reject) => {
			instance.get(getUrl)
				.then((response) => {
					//登录状态
					if(response.data.code == 401) {
						// 退出登录
						globeVue.$store.commit('logout', globeVue);
						globeVue.$store.commit('clearOpenedSubmenu');
						globeVue.$store.commit('clearAllTags');
						globeVue.$router.push({
							name: 'login'
						});
						resolve(
                            MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                                confirmButtonText: 'Re-Login',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                              }).then(() => {
                                store.dispatch('user/resetToken').then(() => {
                                  location.reload()
                                })
                              })
                        );
					}
					//无法进入
					else if(response.data.code != 200) {
						resolve(
                            Message({
                                message: response.data.message || 'Error',
                                type: 'error',
                                duration: 5 * 1000
                              })
                        );
					} else {
						resolve(response.data);
					}
				})
				.catch((error) => {
					resolve({
						code: 0,
						message: "网络错误，请联系管理员"
					});
				});
		}),
		new Promise((resolve, reject) => {
			var timerOut = {
				"code": 0,
				"message": "请求超时"
			}
			setTimeout(() => {
				resolve(timerOut);
			}, 10000);
		})
	])
}
//post
//globeVue 全局vue对象
export const postData = (postUrl, param, globeVue) => {
	return Promise.race([
		new Promise((resolve, reject) => {
			instance.post(base + postUrl, param)
				.then((response) => {
					//无法进入
					if(response.data.code != 200) {
						resolve(
                            Message({
                                message: response.data.message || 'Error',
                                type: 'error',
                                duration: 5 * 1000
                              })
                        );
					}
					//登录状态
					else if(response.data.code == 401) {
						// 退出登录
						globeVue.$store.commit('logout', globeVue);
						globeVue.$store.commit('clearOpenedSubmenu');
						globeVue.$store.commit('clearAllTags');
						globeVue.$router.push({
							name: 'login'
						});
						resolve(
                            MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                                confirmButtonText: 'Re-Login',
                                cancelButtonText: 'Cancel',
                                type: 'warning'
                              }).then(() => {
                                store.dispatch('user/resetToken').then(() => {
                                  location.reload()
                                })
                              })
                        );
					} else {
						resolve(response.data);
					}
				})
				.catch((error, response) => {
					resolve({
						code: 0,
						message: "网络错误，请联系管理员"
					});
				});
		}),
		new Promise((resolve, reject) => {
			var timerOut = {
				"code": 0,
				"message": "请求超时"
			}
			setTimeout(() => {
				resolve(timerOut);
			}, 10000);
		})
	])
}