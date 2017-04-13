export default {
    save:'a/task/project/save',                             //新增项目
    findMyProject:'a/task/project/findMyProject',           //查询项目
    findTaskList:'a/task/project/findTaskList',             //查询项目下的任务列表（通道）
    saveTask:'a/task/project/saveTask',                     //添加（一级）任务
    saveSubTask:'a/task/project/saveSubTask',               //添加子（二级）任务
    findTaskInfo:'a/task/project/findTaskInfo',             //查询任务详情
    findResponsibleList:'a/task/project/findResponsibleList',//查询任务的参与人列表
    findSubTaskList:'a/task/project/findSubTaskList',       //查询子任务列表
    getRecord:'a/task/taskRecord/getRecord',                //查询任务修改记录
    updateTitle:'a/task/project/updateTitle',               //修改（一、二级）任务标题
    updateExecutor:'a/task/project/updateExecutor',         //修改（一、二级）任务的执行者
    updateParticipant: 'a/task/project/updateParticipant',  //修改（一级）任务的参与者
    updateEndTime:'a/task/project/updateEndTime',           //修改（一、二级）任务截止时间
    updatePriority:'a/task/project/updatePriority',         //修改（一级）任务优先级
    updateContent:'a/task/project/updateContent',           //修改（一级）任务内容
    deleteSubTask: 'a/task/project/deleteSubTask',          // 删除子（二级）任务
    updateArchiveState:'a/task/project/updateArchiveState', //取消归档
    updateState:'a/task/project/updateState',               //修改（一、二级）任务状态
    getArchivePage:'a/task/project/getArchivePage',         //分页查询归档任务列表
    userList:'a/task/project/userList'                          //分页查询归档任务列表
}
