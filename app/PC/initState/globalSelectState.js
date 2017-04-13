/**
 * 全局select的state
 * 除了url，curType，其他都是用type的值作为key值，
 * 使之变得可依据type的枚举值可灵活取值
 * Created by Huhy on 2016/8/31.
 */
import * as type from '../constants/globalSelectTypes'

export default {
  url: '/a/sys/dict/getDicts',
  curType: undefined,
  [type.URGENCY_DEGREE]: null,          // 紧急程度
  [type.SEX_REQUIRE]: null,             // 性别要求
  [type.SEX]: null,                     // 性别
  [type.BELONG_PROJECT]: null,          // 所属项目
  [type.DEGREE_REQUIRE]: null,          // 学历要求
  [type.RECRUIT_WAY]: null,             // 招聘方式
  [type.DEPARTMENT_DEMAND_NATURE]: null,// 部门需求性质
  [type.EMPLOYEE_NATURE]: null,         // 员工的性质
  [type.BELONG_COMPANY]: null,          // 所属公司
  [type.EMPLOYEE_RANK]: null,           // 职级
  [type.INDUCTION_FORM]: null,          // 入职形式
  [type.MARITAL_STATUS]: null,          // 婚姻状况
  [type.RESIDENCE_NATURE]: null,        // 户口性质
  [type.HOLIDAY_TYPE]: null,            // 假期类型
  [type.CHANGE_NATURE]: null,           // 变动性质
  [type.ABNORMAL_REASON]: null,         // 异常原因
  [type.BLOOD_TYPE]: null,              // 血型类型
  [type.LEAVE_TYPE]: null,              // 离职类型（针对公司的）
  [type.LEAVE_CATEGORY]: null,          // 离职类别（针对员工的）
  [type.EXTERNAL_CAUSES]: null,         // 外部原因（针对离职的）
  [type.COST_TYPE]: null,               // 费用类型
  [type.BUDGET_RANGE]: null,            // 预算范围
  [type.EXPENSE_PROJECT]: null,         // 报销项目
  [type.ADMINISTRATIVE_EXPENSE_PROJECT]: null,  // 报销项目（行政）
  [type.FINANCE_EXPENSE_PROJECT]: null, // 报销项目（财务部）
  [type.BORROW_WAY]: null,              // 借款方式
  [type.CAME_CONTENT]: null,            // 会审内容
  [type.HANDLE_STATUS]: null,           // 办理状态
  [type.FILE_STATUS]: null,             // 文件状态
  [type.TO_PUT_STORAGE_STATUS]: null,   // 待入库资料状态
  [type.COMPENSATION_FILE_STATUS]: null,// 薪酬档案状态
  [type.EMPLOYEE_EDUCATION]: null,      // 员工学历
  [type.SET_TYPE]: null,                // 设置类型
  [type.POSITIONS_TYPE]: null,          // 职务类别
  [type.EVALUATION_STATUS]: null,       // 评价状态
  [type.PARENT_COMPANY]: null,          // 薪酬归属公司
  [type.APPRAISE_STATUS]: null,         // 自评状态
  [type.LEAVE_CAUSE_EXTERNAL_DETAIL]: null, // 离职原因（外部细节）
  [type.LEAVE_CAUSE_COMPANY_DETAIL]: null,  // 离职原因（公司细节）
  [type.POSITIONS_LEVEL]: null,         // 职务级别
  [type.WORK_PLACE]: null,              // 办公地点
  [type.PROJECT_TASK_PRIORITY]: null,   // 优先级（项目管理）
  [type.PROJECT_TASK_TYPE]: null,       // 优任务类型（项目管理）
  [type.PROJECT_TASK_STATE]: null,      // 任务状态（项目管理）
  [type.PROJECT_TASK_PERCENTAGE]: null, // 完成百分比（项目管理）

  [type.ASSESS_RESULT]: null,           // 评估结果
  [type.DEPT_CODE]: null,               // 公司部门编码（目前专用于星星专车部门）
  [type.CONTRACT_COMPANY]: null,        // 员工合同所属公司
  [type.PEOPLE_NATIONAL]: null,         // 民族
  [type.TEST_PERIOD]: null,             // 试用期
  [type.CONTRACT_TYPE]: null,           // 合同类型
  [type.AGENT_COMPANY]: null,           // 待办单位
  [type.POSITION_NATURE]: null,         // 职位性质
  [type.MOVE_NATURE]: null,             // 异动性质
  [type.EXPENSE_LOAN]: null,            // 是否借款
  [type.INVOICE_TYPE]: null,            // 发票类型
  [type.PAYEE_TYPE]: null,              // 收款单位
  [type.PROJECT_TYPE]: null,                //财务所属项目
  [type.WORK_TIME_TYPE]: null                //财务所属项目
}
