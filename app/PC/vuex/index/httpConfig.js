/**
 * 拦截器
 * Created by Huhy on 2016/8/29.
 */
import Vue from 'vue';
import store from './store'
import { showDialog, hideDialog } from '../../actions/dialogAction'

import * as content from '../../constants/contentTypes';
import * as interfaces from '../../constants/interfaceTypes';

export default function(router) {

    // 配置对请求和响应的拦截处理
    Vue.http.interceptors.push((request, next) => {

        // 添加同意的请求头属性
        request.headers.client = 'PC';
        next((response) => {
            if(response.status == 0){
                showDialog(store, {
                    title: '温馨提示',
                    message: '您还未登录，或登陆已超时，请重新登陆！',
                    confirm: {
                        text: '去登录',
                        callback: function () {
                            router.go('/login');
                            hideDialog(store);
                        }
                    },
                    close: {
                        callback: function () {
                            router.go('/login');
                            hideDialog(store);
                        }
                    }
                })
            }
            if(response.status == 404){
                showDialog(store, {
                    title: '温馨提示',
                    message: '服务器开小差啦，暂时无法操作此项',
                    confirm: {
                        text: '确定',
                        callback: function () {
                            hideDialog(store);
                        }
                    },
                    close: {
                        callback: function () {
                            hideDialog(store);
                        }
                    }
                })
            }
            // huhy于2016-9-21 12:03:19修改，添加了对headers.task的判断
            // 原因是任务管理模块的错误提示方式与其他地方不同
            response = response.json();
            if(!request.headers.task && (response.exception || response.exception === "")){
                if(response.status === 'SYS10002'){
                  showDialog(store, {
                    title: '温馨提示',
                    message: response.message,
                    confirm: {
                      text: '去登录',
                      callback: function () {
                        router.go('/login');
                        hideDialog(store);
                      }
                    },
                    close: {
                      callback: function () {
                        router.go('/login');
                        hideDialog(store);
                      }
                    }
                  });
                } else{
                  showDialog(store, {
                    title: '温馨提示',
                    message: response.message,
                    close: {
                      callback: function () {
                        hideDialog(store);
                      }
                    },
                    confirm: {
                      text: '确定',
                      callback: function () {
                        hideDialog(store);
                      }
                    }
                  })
                }
            }
        });
    });
}
