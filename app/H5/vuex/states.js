import JsonTool from  '../../tool/lib/JsonTool';
import {loginState} from  '../initState/loginState';
import {counterState} from  '../initState/counterState';

const jsonTool = new JsonTool();

export const state = jsonTool.concatLst([
    loginState,
    counterState
]);

