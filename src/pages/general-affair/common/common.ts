const GENERAL = { code: 10, name: '一般' }
const SPECIAL = { code: 20, name: '紧急' }
const EXTREME = { code: 30, name: '特急' }

export const Urgency = { GENERAL, SPECIAL, EXTREME }
const UrgencyMap = new Map<number, string>()
for(const entry of Object.entries(Urgency)){
  const t = entry[1]
  UrgencyMap.set(t.code, t.name)
}

export const GetUrgencyName = (code: number) => {
  return UrgencyMap.get(code) ?? ''
}

const NORMAL = { code: 10, name: '常规' }
const SECRET = { code: 20, name: '秘密' }
const CONFIDENTIAL = { code: 30, name: '机密' }
const TOP = { code: 40, name: '绝密' }

export const Classification = { NORMAL, SECRET, CONFIDENTIAL, TOP }
const ClassificationMap = new Map<number, string>()
for(const entry of Object.entries(Classification)){
  const t = entry[1]
  ClassificationMap.set(t.code, t.name)
}

export const GetClassificationName = (code: number) => {
  return ClassificationMap.get(code) ?? ''
}
