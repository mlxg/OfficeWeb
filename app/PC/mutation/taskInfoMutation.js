export default {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    ARCHIVEFLAG (state,param) {
        state.taskInfoTabCmp.taskInfoArchiveCmp.slidingFlag = param;
    },
    POPCHANGEFLAG(state,{flag,params}) {
        state.taskInfoTabCmp.taskInfoPopCmp[flag] = params;
    },
    ADDIOBINCACHE(state,params){
        const taskLst =state.taskInfoTabCmp.result.result;
        taskLst.forEach((item)=>{
                if(item.taskStateId == params.taskStateId){
                    const lst =  item.list,
                          length = lst.length;
                    lst.push( params);
                }
        });
    },
    ADDJOBARTERIDINCACHE(state,{type,id, priorityId}){
        let taskLst =state.taskInfoTabCmp.result.result;
        taskLst.forEach((item)=>{
            if(item.taskStateId == type){
                const lst =  item.list,
                    length = lst.length;
                lst[length-1].id=id;
                lst[length-1].priorityId=priorityId;
            }
        });
    },
    SHOWORHIDEERROR(state,params, taskStateId){
        state.taskInfoTabCmp.toolErrorCmp.result.message = params;
    },
    ARLTERTILTLEINCAHCE(state,{id,title,type}){
        const taskLst =state.taskInfoTabCmp.result.result;
        taskLst.forEach((item)=>{
            if(item.taskStateId == type){
                const lst =  item.list;
                lst.forEach((it)=>(it.id == id ) && (it.title=title))
            }
        });
    },
    ALRTERSTATUINCAHCE(state,{id,taskStateId,oldType}){
        const taskLst =state.taskInfoTabCmp.result.result;
        let child ={};
        const setValue=()=>{
            taskLst.forEach((item)=>{
                if(item.taskStateId == taskStateId){
                    child.taskStateId = taskStateId;
                    item.list.push(child);

                }
            })
        };
        taskLst.forEach((item)=>{
            if(item.taskStateId == oldType){
                const lst =  item.list;
                lst.forEach((it,i)=>{
                    if(it.id == id ) {
                        child=it;
                        setValue();
                        lst.splice(i,1);
                    }
                })
            }
        });
    },
    ARLTERCONTENTINCAHCE(state,{id,type,content}){
        const taskLst =state.taskInfoTabCmp.result.result;
        taskLst.forEach((item)=>{
            if(item.taskStateId == type){
                const lst =  item.list;
                lst.forEach((it)=>(it.id == id ) && (it.content=content))
            }
        });
    },
    ALTERPRIORITINCACHE(state,{id,priorityId,type}){
        const taskLst =state.taskInfoTabCmp.result.result;
        taskLst.forEach((item)=>{
            if(item.taskStateId == type){
                const lst =  item.list;
                lst.forEach((it)=>(it.id == id ) && (it.priorityId=priorityId))
            }
        });
    },
    UPDATEENDTIME(state,{endTime, id, taskStateId, endTimeVal, isShow}){
      let taskLst =state.taskInfoTabCmp.result.result;
      taskLst.forEach((item)=>{
        if(item.taskStateId == taskStateId){
          let lst =  item.list;
          //lst.forEach((it)=>(it.id == id ) && (it.endTime = endTime))
          let index = lst.findIndex((it) => it.id === id);
          if(index !== -1) {
            let item = lst[index], res = {};
            Object.assign(res, item);
            res.endTime = endTime;
            res.endTimeVal = endTimeVal;
            res.isShow = isShow;
            lst.splice(index, 1, res)
          }
        }
      });
    },
    UPDATEEXECUTOR(state,{responsibleList, id, taskStateId, isShow}){
      let taskLst =state.taskInfoTabCmp.result.result;
      taskLst.forEach((item)=>{
        if(item.taskStateId == taskStateId){
          let lst =  item.list;
          let index = lst.findIndex((it) => it.id === id);
          if(index !== -1) {
            let item = lst[index], res = {};
            Object.assign(res, item);
            res.responsibleList = responsibleList;
            res.isShow = isShow;
            lst.splice(index, 1, res)
          }
        }
      });
    },
    UPDATESUBTASKAMOUNT(state, {finishAmount, subTaskAmount, id, taskStateId}){
      let taskLst =state.taskInfoTabCmp.result.result;
      let item = taskLst.find((t)=>t.taskStateId == taskStateId);
      let index = item.list.findIndex((it) => it.id === id);
      if(index !== -1) {
        let task = item.list[index];
        task.finishAmount = finishAmount;
        task.subTaskAmount = subTaskAmount;
      }
    },
    DELETETASK(state, {id, taskStateId}){
      let taskLst =state.taskInfoTabCmp.result.result;
      let item = taskLst.find((t)=>t.taskStateId == taskStateId);
      let index = item.list.findIndex((it) => it.id === id);
      if(index !== -1) {
        item.list.splice(index, 1)
      }
    }
};
