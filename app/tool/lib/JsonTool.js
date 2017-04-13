/**
 * Created by girl on 16/6/2.
 */
/**
 *                          处理json格式的工具类
 *                                       目录
 *							拼接俩个json对象		concat
 */
class JsonTool{
    constructor(){
    }

    /**
     * 拼接2个json
     * @param json1
     * @param json2
     */
        concat(json1={} ,json2={}){
        for(let key in json2){
            json1[key] = json2[key];
        };
        return json1;
    }
    concatLst(jsonLst=[]){
        const myJson ={};
        jsonLst.forEach((item)=>{
            this.concat(myJson,item);
        })
        return myJson;
    }

}
module.exports = JsonTool;
