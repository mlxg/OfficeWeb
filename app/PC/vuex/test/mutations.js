/**
 * Created by girl on 16/8/16.
 */
import validateAndSubmit from  '../../js/validateAndSubmit';

export default {
        SUBMITE :function(state,{familyNameLst=[],result={},loadFlg=false,otpFlag=false,type=false}){
        validateAndSubmit.undidObj(state,familyNameLst,result,loadFlg,otpFlag,type);
            console.log(JSON.stringify(state));
    }
};
