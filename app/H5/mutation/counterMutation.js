/**
 * Created by girl on 16/8/1.
 */
import {INCREMENT} from'../constants/couterActionTypes';
import {state} from'../initState/counterState';

export  const counterMutation = {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    INCREMENT (state, amount) {
        state.count = state.count + amount
    }
};
