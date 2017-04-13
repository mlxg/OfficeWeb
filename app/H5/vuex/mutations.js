/**
 * Created by girl on 16/8/16.
 */
import JsonTool from  '../../tool/lib/JsonTool';
import validateAndSubmit from  '../js/validateAndSubmit';
import {loginMutation} from  '../mutation/loginMutation';
import {counterMutation} from  '../mutation/counterMutation';

const jsonTool = new JsonTool();
 const mutations = jsonTool.concatLst([
    loginMutation,
    counterMutation
]);
//所有提交的方法
mutations.SUBMITE =function(state,{familyNameLst=[],result={},loadFlg=false}){
    validateAndSubmit.undidObj(state,familyNameLst,result,loadFlg);

};

export default mutations;
