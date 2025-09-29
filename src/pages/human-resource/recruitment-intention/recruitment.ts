const COMPANY = { code: 10, name: "公司" };
const CANDIDATE = { code: 20, name: "应聘者" };

export const RecruitmentRejectSide = { COMPANY, CANDIDATE }

const RecruitmentRejectSideMap = new Map<number, string>();
for (const entry of Object.entries(RecruitmentRejectSide)) {
  const t = entry[1];
  RecruitmentRejectSideMap.set(t.code, t.name);
}

export const GetRecruitmentRejectSideByCode = (code: number) => {
  return RecruitmentRejectSideMap.get(code) ?? ''
}

const WAIT_FOR_APPROVAL = { code: 10, name: "待审批" };
const IN_APPROVAL = { code: 20, name: "入职审批中" };
const JOB_ENTRY_REJECT = { code: 30, name: "入职审批拒绝" };
const JOB_ENTRY_CANCELLED = { code: 40, name: "取消入职" };
const PROBATION = { code: 50, name: "试用中" };
const PROBATION_APPROVAL = { code: 60, name: "转正审批中" }
const PROBATION_REJECT = { code: 70, name: "转正审批驳回" };
const PASS_PROBATION = { code: 80, name: "已转正" };
const IN_RESIGN = { code: 90, name: '离职中' };
const RESIGNED = { code: 100, name: "已离职" };

export const EntryJobStatus = {
  WAIT_FOR_APPROVAL, IN_APPROVAL, JOB_ENTRY_REJECT, JOB_ENTRY_CANCELLED,
  PROBATION, PROBATION_APPROVAL, PROBATION_REJECT, PASS_PROBATION, IN_RESIGN, RESIGNED
}
const EntryJobStatusMap = new Map<number, string>();
for (const entry of Object.entries(EntryJobStatus)) {
  const t = entry[1]
  EntryJobStatusMap.set(t.code, t.name);
}

export const GetEntryJobStatusName = (code: number) => {
  return EntryJobStatusMap.get(code) ?? ''
}
