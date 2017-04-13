// action 会收到 store 作为它的第一个参数

import {INCREMENT} from '../constants/couterActionTypes';
export const incrementCounter = function ({ dispatch, state }) {
    dispatch('INCREMENT', 1)
};

