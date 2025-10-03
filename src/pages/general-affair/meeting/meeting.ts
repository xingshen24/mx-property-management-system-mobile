
const NORMAL = { code: 10, name: '常规会议' }
const OFFICE_MEETING = { code: 20, name: '办公会会议' }
const MONTH_MEETING = { code: 30, name: '月度会议' }

export const MeetingType = { NORMAL, OFFICE_MEETING, MONTH_MEETING }
const MeetingTypeMap = new Map<number, string>()
for (const entry of Object.entries(MeetingType)) {
  const t = entry[1]
  MeetingTypeMap.set(t.code, t.name)
}

export const GetMeetingTypeName = (code: number) => {
  return MeetingTypeMap.get(code) ?? ''
}
