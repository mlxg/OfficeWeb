import JsonTool from  '../../tool/lib/JsonTool';
import loginGetter from  '../getters/loginGetter';
import conterGetter from  '../getters/conterGetter';

const jsonTool = new JsonTool();
export const getters = jsonTool.concatLst([
    loginGetter,
    conterGetter
]);


