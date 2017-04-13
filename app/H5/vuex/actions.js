import JsonTool from  '../../tool/lib/JsonTool';
import loginAction from  '../actions/loginAction';
import counterAction from  '../actions/counterAction';

const jsonTool = new JsonTool();
export const actions = jsonTool.concatLst([
    loginAction,
    counterAction
]);

