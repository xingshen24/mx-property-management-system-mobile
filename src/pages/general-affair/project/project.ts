const UNDER_APPROVAL = { code: 100, name: '立项中' }
const JUDICIAL_REVIEW = { code: 300, name: '合同法审中' }
const JUDICIAL_REVIEW_PASS = { code: 400, name: '法审通过' }
const JUDICIAL_REVIEW_REJECT = { code: 450, name: '法审驳回' }
const BID_OPENED = { code: 600, name: '已开标' }
const SIGNED_CONTRACT = { code: 700, name: '已签订合同' }
const COMPARISON_DOCUMENT_MAKING = { code: 1200, name: '比选文件制作中' }
const COMPARISON_DOCUMENT_MADE = { code: 1300, name: '比选文件制作完毕' }
const INVITATION_TO_BID = { code: 1400, name: '邀标中' }
const BID_EVALUATION = { code: 1500, name: '评标中' }
const INQUIRY_LETTER_MAKING = { code: 2200, name: '询价函制作中' }
const INQUIRING = { code: 2400, name: '询价中' }
const COMPARING_PRICE = { code: 2500, name: '比价中' }
const GIVE_UP = { code: 5000, name: '放弃立项' }

export const ProjectProgress = { UNDER_APPROVAL, JUDICIAL_REVIEW, JUDICIAL_REVIEW_PASS, JUDICIAL_REVIEW_REJECT, BID_OPENED, SIGNED_CONTRACT, COMPARISON_DOCUMENT_MAKING, COMPARISON_DOCUMENT_MADE, INVITATION_TO_BID, BID_EVALUATION, INQUIRY_LETTER_MAKING, INQUIRING, COMPARING_PRICE, GIVE_UP }
const ProjectProgressMap = new Map<number, string>()
for (const entry of Object.entries(ProjectProgress)) {
  const t = entry[1]
  ProjectProgressMap.set(t.code, t.name)
}

export const GetProjectProgressName = (code: number) => {
  return ProjectProgressMap.get(code) ?? ''
}

const INQUIRY = { code: 10, name: '询价' }
const COMPARATIVE_SELECTION = { code: 20, name: '比选' }
const ENTRUST = { code: 30, name: '委托招标代理机构组织' }

export const ProjectRecruitmentMethod = { INQUIRY, COMPARATIVE_SELECTION, ENTRUST }
const ProjectRecruitmentMethodMap = new Map<number, string>()
for (const entry of Object.entries(ProjectRecruitmentMethod)) {
  const t = entry[1]
  ProjectRecruitmentMethodMap.set(t.code, t.name)
}

export const GetProjectRecruitmentMethodName = (code: number) => {
  return ProjectRecruitmentMethodMap.get(code) ?? ''
}

const LOWEST_PRICE_SELECTION = { code: 10, name: '最低价评选法' }
const COMPREHENSIVE_SELECTION = { code: 20, name: '综合评选法' }

export const ProjectSelectionMethod = { LOWEST_PRICE_SELECTION, COMPREHENSIVE_SELECTION }
const ProjectSelectionMethodMap = new Map<number, string>()
for (const entry of Object.entries(ProjectSelectionMethod)) {
  const t = entry[1]
  ProjectSelectionMethodMap.set(t.code, t.name)
}

export const GetProjectSelectionMethodName = (code: number) => {
  return ProjectSelectionMethodMap.get(code) ?? ''
}
