import sour from  '../js/taskSource';
export default {
    // 应用启动时，初始化的state
    taskInfoTabCmp:{ //ForgetPwd登陆框组建
        source:sour.findTaskList,
        result:'',
        allCtrFlag:false,           //一些弹框点击空出隐藏的控制标志
        taskInfoPopCmp: { //BtmCnt提交组建
            openPopFlag:false,//弹框的标志
            projFlag:false, //等级标志
            moreFlag:false, //更多标志
            findResponsibleListDo:{                      //查询参与人列表
                source: sour.findResponsibleList, //login的路径
                result:''
            },
            subLstDo:{                               //查询子任务列表
                source: sour.findSubTaskList, //login的路径
                result:''
            },
            flowLstDo:{                             //查询流水
                source: sour.getRecord, //login的路径
                result:''
            },
            alterTitleDo:{
                source:sour.updateTitle,
                result:''
            },
            alterContentDo:{
                source:sour.updateContent,
                result:''
            },
            alterStautDo:{
                source:sour.updateState,
                result:''
            },
            alertPriorityDo:{
                source:sour.updatePriority,
                result:''
            },
            addSubJobDo:{
                source:sour.saveSubTask,
                result:''
            }
        },
        publicGalleryTabCmp:{
            source:sour.saveTask,
            result:''
        },
        publicChoosePersonCmp:{
            choosePersonFlag:false, //开启选人弹框的标志
            source:sour.userList,
            result:''
        },
        taskInfoArchiveCmp:{
            source:sour.getArchivePage,
            result:'',
            slidingFlag:false //打开归档界面
        },
        toolErrorCmp:{
            result:{
                message: false
            }
        }    //错误信息
    }
};
