/**
 * Created by girl on 16/8/5.
 */
import * as types from '../constants/forgetPwdActionTypes';
import $ from 'jquery';
import validateAndSubmit from '../js/validateAndSubmit';
//导出登录的方法
//获取新密码
export const forgetPwdGetNewPwd = function ({ dispatch, state }) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        componentLst: ['forgetPwdCmp', 'forgetPwdTabCmp', 'btmCntCmp'],
        loadFlg: 'btnFlag', //loading标志
        validates: [
            {
                'name': 'email', 'rules': [ {'rule': 'isEmail', 'errorMsg': '请输入争取的email格式'},{'rule':'isEmpty','errorMsg':'email不能为空'}]
            }
        ]
    });
};



//这些方法都导出,在其他文件导入时候,使用import * as actions 就可以生成一个actions对象包含所有的export
