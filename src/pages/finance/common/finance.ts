const DRAFT = { code: 10, name: '草稿' }
const DEPT_HEAD_PROCESSING = { code: 20, name: '部门审批中' }
const DEPT_LEADER_PROCESSING = { code: 30, name: '部门领导审批中' }
const FINANCE_REVIEWING = { code: 37, name: '财务复核中' }
const GM_PROCESSING = { code: 40, name: '总经理审批中' }
const REJECT = { code: 50, name: '驳回' }
const REVIEW_FAILED = { code: 55, name: '复核不通过' }
const CANCEL = { code: 60, name: '取消' }
const APPROVE = { code: 100, name: '通过' }

export const GeneralWithFinanceReviewApprovalState = { DRAFT, DEPT_HEAD_PROCESSING, DEPT_LEADER_PROCESSING, FINANCE_REVIEWING, GM_PROCESSING, REJECT, REVIEW_FAILED, CANCEL, APPROVE }
const GeneralWithFinanceReviewApprovalStateMap = new Map<number, string>()
for(const entry of Object.entries(GeneralWithFinanceReviewApprovalState)){
  const t = entry[1]
  GeneralWithFinanceReviewApprovalStateMap.set(t.code, t.name)
}

export const GetGeneralWithFinanceReviewApprovalStateName = (code: number) => {
  return GeneralWithFinanceReviewApprovalStateMap.get(code) ?? ''
}


