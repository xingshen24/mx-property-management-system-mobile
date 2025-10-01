const ANNUAL_LEAVE = { code: 100, name: '年假' }
const ABSENCE_LEAVE = { code: 200, name: '事假' }
const SICK_LEAVE = { code: 300, name: '病假' }
const MARRIAGE_LEAVE = { code: 400, name: '婚假' }
const MATERNITY_LEAVE = { code: 500, name: '产假' }
const PATERNITY_LEAVE = { code: 600, name: '陪产假' }
const BEREAVEMENT_LEAVE = { code: 700, name: '丧假' }
const WORK_INJURY_LEAVE = { code: 800, name: '工伤假' }
const COMPENSATORY = { code: 900, name: '调休假' }

export const LeaveType = { ANNUAL_LEAVE, ABSENCE_LEAVE, SICK_LEAVE, MARRIAGE_LEAVE, MATERNITY_LEAVE, PATERNITY_LEAVE, BEREAVEMENT_LEAVE, WORK_INJURY_LEAVE, COMPENSATORY }
const LeaveTypeMap = new Map<number, string>()
for (const entry of Object.entries(LeaveType)) {
  const t = entry[1]
  LeaveTypeMap.set(t.code, t.name)
}

export const GetLeaveTypeName = (code: number) => {
  return LeaveTypeMap.get(code) ?? ''
}
