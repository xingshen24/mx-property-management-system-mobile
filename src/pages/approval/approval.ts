const DRAFT = { code: 10, name: '草稿' }
const DEPT_HEAD_PROCESSING = { code: 20, name: '部门审批中' }
const DEPT_LEADER_PROCESSING = { code: 30, name: '部门领导审批中' }
const GM_PROCESSING = { code: 40, name: '总经理审批中' }
const REJECT = { code: 50, name: '驳回' }
const CANCEL = { code: 60, name: '取消' }
const APPROVE = { code: 100, name: '通过' }

export const GeneralProcessState = { DRAFT, DEPT_HEAD_PROCESSING, DEPT_LEADER_PROCESSING, GM_PROCESSING, REJECT, CANCEL, APPROVE }
const GeneralProcessStateMap = new Map<number, string>()
for (const entry of Object.entries(GeneralProcessState)) {
  const t = entry[1]
  GeneralProcessStateMap.set(t.code, t.name)
}

export const GetGeneralProcessStateName = (code: number) => {
  return GeneralProcessStateMap.get(code) ?? ''
}



export const DualTrackProcessState = {
  DRAFT: { code: 10, name: '草稿' },
  DEPT_HEAD_PROCESSING: { code: 20, name: '部门审批中' },
  DEPT_LEADER_PROCESSING: { code: 30, name: '部门领导审批中' },
  GM_PROCESSING: { code: 40, name: '总经理审批中' },
  PARK_PROCESSING: { code: 44, name: '园区处理中' },
  MANAGEMENT_DEPARTMENT_PROCESSING: { code: 47, name: '管理部门处理中' },
  REJECT: { code: 50, name: '驳回' },
  CANCEL: { code: 60, name: '取消' },
  APPROVE: { code: 100, name: '通过' }
}
const DualTrackProcessStateMap = new Map<number, string>()
for (const entry of Object.entries(DualTrackProcessState)) {
  const t = entry[1]
  DualTrackProcessStateMap.set(t.code, t.name)
}

export const GetDualTrackProcessStateName = (code: number) => {
  return DualTrackProcessStateMap.get(code) ?? ''
}


export const TieredApprovalState = {
  DRAFT: { code: 10, name: '草稿' },
  DEPT_HEAD_PROCESSING: { code: 20, name: '部门审批中' },
  DEPT_LEADER_PROCESSING: { code: 30, name: '部门领导审批中' },
  MULTI_DEPT_PROCESSING: { code: 35, name: '多部门审批中' },
  GM_PROCESSING: { code: 40, name: '总经理审批中' },
  REJECT: { code: 50, name: '驳回' },
  CANCEL: { code: 60, name: '取消' },
  APPROVE: { code: 100, name: '通过' }
}
const TieredApprovalStateMap = new Map<number, string>()
for (const entry of Object.entries(TieredApprovalState)) {
  const t = entry[1]
  TieredApprovalStateMap.set(t.code, t.name)
}

export const GetTieredApprovalStateName = (code: number) => {
  return TieredApprovalStateMap.get(code) ?? ''
}

