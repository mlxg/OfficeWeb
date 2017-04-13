/**
 * 全局select的mutation
 * 除了设置curType之外，其他都是可根据type的值自动匹配的
 * Created by Huhy on 2016/8/31.
 */
import * as type from '../constants/globalSelectTypes'

export default {
  /**
   * 当前type
   * @param state
   * @param curType
   */
  ['SELECT_CURTYPE'] (state, curType) {
    state.curType = curType
  },
  /**
   * 紧急程度
   * @param state
   * @param data
   */
    [type.URGENCY_DEGREE] (state, data) {
    state[type.URGENCY_DEGREE] = data
  },
  /**
   * 性别要求
   * @param state
   * @param data
   */
    [type.SEX_REQUIRE] (state, data) {
    state[type.SEX_REQUIRE] = data
  },
  /**
   * 性别
   * @param state
   * @param data
   */
    [type.SEX] (state, data) {
    state[type.SEX] = data
  },
  /**
   * 所属项目
   * @param state
   * @param data
   */
    [type.BELONG_PROJECT] (state, data) {
    state[type.BELONG_PROJECT] = data
  },
  /**
   * 学历要求
   * @param state
   * @param data
   */
    [type.DEGREE_REQUIRE] (state, data) {
    state[type.DEGREE_REQUIRE] = data
  },
  /**
   * 招聘方式
   * @param state
   * @param data
   */
    [type.RECRUIT_WAY] (state, data) {
    state[type.RECRUIT_WAY] = data
  },
  /**
   * 部门需求性质
   * @param state
   * @param data
   */
    [type.DEPARTMENT_DEMAND_NATURE] (state, data) {
    state[type.DEPARTMENT_DEMAND_NATURE] = data
  },
  /**
   * 员工的性质
   * @param state
   * @param data
   */
    [type.EMPLOYEE_NATURE] (state, data) {
    state[type.EMPLOYEE_NATURE] = data
  },
  /**
   * 所属公司
   * @param state
   * @param data
   */
    [type.BELONG_COMPANY] (state, data) {
    state[type.BELONG_COMPANY] = data
  },
  /**
   * 职级
   * @param state
   * @param data
   */
    [type.EMPLOYEE_RANK] (state, data) {
    state[type.EMPLOYEE_RANK] = data
  },
  /**
   * 入职形式
   * @param state
   * @param data
   */
    [type.INDUCTION_FORM] (state, data) {
    state[type.INDUCTION_FORM] = data
  },
  /**
   * 婚姻状况
   * @param state
   * @param data
   */
    [type.MARITAL_STATUS] (state, data) {
    state[type.MARITAL_STATUS] = data
  },
  /**
   * 户口性质
   * @param state
   * @param data
   */
    [type.RESIDENCE_NATURE] (state, data) {
    state[type.RESIDENCE_NATURE] = data
  },
  /**
   * 假期类型
   * @param state
   * @param data
   */
    [type.HOLIDAY_TYPE] (state, data) {
    state[type.HOLIDAY_TYPE] = data
  },
  /**
   * 变动性质
   * @param state
   * @param data
   */
    [type.CHANGE_NATURE] (state, data) {
    state[type.CHANGE_NATURE] = data
  },
  /**
   * 异常原因
   * @param state
   * @param data
   */
    [type.ABNORMAL_REASON] (state, data) {
    state[type.ABNORMAL_REASON] = data
  },
  /**
   * 离职类型
   * @param state
   * @param data
   */
    [type.LEAVE_TYPE] (state, data) {
    state[type.LEAVE_TYPE] = data
  },
  /**
   * 血型类型
   * @param state
   * @param data
   */
    [type.BLOOD_TYPE] (state, data) {
    state[type.BLOOD_TYPE] = data
  },
  /**
   * 离职类别（针对员工的）
   * @param state
   * @param data
   */
    [type.LEAVE_CATEGORY] (state, data) {
    state[type.LEAVE_CATEGORY] = data
  },
  /**
   * 外部原因（针对离职的）
   * @param state
   * @param data
   */
    [type.EXTERNAL_CAUSES] (state, data) {
    state[type.EXTERNAL_CAUSES] = data
  },
  /**
   * 费用类型
   * @param state
   * @param data
   */
    [type.COST_TYPE] (state, data) {
    state[type.COST_TYPE] = data
  },
  /**
   * 预算范围
   * @param state
   * @param data
   */
    [type.BUDGET_RANGE] (state, data) {
    state[type.BUDGET_RANGE] = data
  },
  /**
   * 报销项目
   * @param state
   * @param data
   */
    [type.EXPENSE_PROJECT] (state, data) {
    state[type.EXPENSE_PROJECT] = data
  },
  /**
   * 报销项目（行政）
   * @param state
   * @param data
   */
    [type.ADMINISTRATIVE_EXPENSE_PROJECT] (state, data) {
    state[type.ADMINISTRATIVE_EXPENSE_PROJECT] = data
  },
  /**
   * 报销项目（财务部）
   * @param state
   * @param data
   */
    [type.FINANCE_EXPENSE_PROJECT] (state, data) {
    state[type.FINANCE_EXPENSE_PROJECT] = data
  },
  /**
   * 借款方式
   * @param state
   * @param data
   */
    [type.BORROW_WAY] (state, data) {
    state[type.BORROW_WAY] = data
  },
  /**
   * 会审内容
   * @param state
   * @param data
   */
    [type.CAME_CONTENT] (state, data) {
    state[type.CAME_CONTENT] = data
  },
  /**
   * 办理状态
   * @param state
   * @param data
   */
    [type.HANDLE_STATUS] (state, data) {
    state[type.HANDLE_STATUS] = data
  },
  /**
   * 文件状态
   * @param state
   * @param data
   */
    [type.FILE_STATUS] (state, data) {
    state[type.FILE_STATUS] = data
  },
  /**
   * 待入库资料状态
   * @param state
   * @param data
   */
    [type.TO_PUT_STORAGE_STATUS] (state, data) {
    state[type.TO_PUT_STORAGE_STATUS] = data
  },
  /**
   * 薪酬档案状态
   * @param state
   * @param data
   */
    [type.COMPENSATION_FILE_STATUS] (state, data) {
    state[type.COMPENSATION_FILE_STATUS] = data
  },
  /**
   * 员工学历
   * @param state
   * @param data
   */
    [type.EMPLOYEE_EDUCATION] (state, data) {
    state[type.EMPLOYEE_EDUCATION] = data
  },
  /**
   * 设置类型
   * @param state
   * @param data
   */
    [type.SET_TYPE] (state, data) {
    state[type.SET_TYPE] = data
  },
  /**
   * 职务类别
   * @param state
   * @param data
   */
    [type.POSITIONS_TYPE] (state, data) {
    state[type.POSITIONS_TYPE] = data
  },
  /**
   * 评价状态
   * @param state
   * @param data
   */
    [type.EVALUATION_STATUS] (state, data) {
    state[type.EVALUATION_STATUS] = data
  },
  /**
   * 薪酬归属公司
   * @param state
   * @param data
   */
    [type.PARENT_COMPANY] (state, data) {
    state[type.PARENT_COMPANY] = data
  },
  /**
   * 自评状态
   * @param state
   * @param data
   */
    [type.APPRAISE_STATUS] (state, data) {
    state[type.APPRAISE_STATUS] = data
  },
  /**
   * 离职原因（外部细节）
   * @param state
   * @param data
   */
    [type.LEAVE_CAUSE_EXTERNAL_DETAIL] (state, data) {
    state[type.LEAVE_CAUSE_EXTERNAL_DETAIL] = data
  },
  /**
   * 离职原因（公司细节）
   * @param state
   * @param data
   */
    [type.LEAVE_CAUSE_COMPANY_DETAIL] (state, data) {
    state[type.LEAVE_CAUSE_COMPANY_DETAIL] = data
  },
  /**
   * 职务级别
   * @param state
   * @param data
   */
    [type.POSITIONS_LEVEL] (state, data) {
    state[type.POSITIONS_LEVEL] = data
  },
  /**
   * 办公地点
   * @param state
   * @param data
   */
    [type.WORK_PLACE] (state, data) {
    state[type.WORK_PLACE] = data
  },
  /**
   * 优先级（项目管理）
   * @param state
   * @param data
   */
    [type.PROJECT_TASK_PRIORITY] (state, data) {
    state[type.PROJECT_TASK_PRIORITY] = data
  },
  /**
   * 任务类型（项目管理）
   * @param state
   * @param data
   */
    [type.PROJECT_TASK_TYPE] (state, data) {
    state[type.PROJECT_TASK_TYPE] = data
  },
  /**
   * 任务状态（项目管理）
   * @param state
   * @param data
   */
    [type.PROJECT_TASK_STATE] (state, data) {
    state[type.PROJECT_TASK_STATE] = data
  },
  /**
   * 完成百分比（项目管理）
   * @param state
   * @param data
   */
    [type.PROJECT_TASK_PERCENTAGE] (state, data) {
    state[type.PROJECT_TASK_PERCENTAGE] = data
  },
  /**
   * 完成百分比（项目管理）
   * @param state
   * @param data
   */
      [type.ASSESS_RESULT] (state, data) {
    state[type.ASSESS_RESULT] = data
  },
  /**
   * 部门编码（目前星星车专用）
   * @param state
   * @param data
   */
    [type.DEPT_CODE] (state, data) {
    state[type.DEPT_CODE] = data
  },
  /**
   * 员工合同所属公司
   * @param state
   * @param data
   */
    [type.CONTRACT_COMPANY] (state, data) {
    state[type.CONTRACT_COMPANY] = data
  },
  /**
   * 民族
   * @param state
   * @param data
   */
    [type.PEOPLE_NATIONAL] (state, data) {
    state[type.PEOPLE_NATIONAL] = data
  },
  /**
   * 试用期
   * @param state
   * @param data
   */
      [type.TEST_PERIOD] (state, data) {
    state[type.TEST_PERIOD] = data
  },
  /**
   * 合同类型
   * @param state
   * @param data
   */
      [type.CONTRACT_TYPE] (state, data) {
    state[type.CONTRACT_TYPE] = data
  },
  /**
   * 代办单位
   * @param state
   * @param data
   */
      [type.AGENT_COMPANY] (state, data) {
    state[type.AGENT_COMPANY] = data
  },
  /**
   * 职位性质
   * @param state
   * @param data
   */
      [type.POSITION_NATURE] (state, data) {
    state[type.POSITION_NATURE] = data
  },
  /**
   * 异动性质
   * @param state
   * @param data
   */
    [type.MOVE_NATURE] (state, data) {
    state[type.MOVE_NATURE] = data
  },
  /**
   * 是否借款
   * @param state
   * @param data
   */
    [type.EXPENSE_LOAN] (state, data) {
    state[type.EXPENSE_LOAN] = data
  },
  /**
   * 发票类型
   * @param state
   * @param data
   */
    [type.INVOICE_TYPE] (state, data) {
    state[type.INVOICE_TYPE] = data
  },
  /**
   * 收款单位
   * @param state
   * @param data
   */
    [type.PAYEE_TYPE] (state, data) {
    state[type.PAYEE_TYPE] = data
  },
  /**
   * 财务所属项目
   * @param state
   * @param data
   */
    [type.PROJECT_TYPE] (state, data) {
    state[type.PROJECT_TYPE] = data
  },
  /**
   * 考勤异常
   * @param state
   * @param data
   */
    [type.WORK_TIME_TYPE] (state, data) {
    state[type.WORK_TIME_TYPE] = data
  }
}
