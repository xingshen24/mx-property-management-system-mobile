const ONLINE = { code: 10, name: '在线' }
const PAPER = { code: 20, name: '纸质' }
const ANY = { code: 30, name: '不限形式' }
const OTHER = { code: 80, name: '其它' }

export const BorrowType = { ONLINE, PAPER, ANY, OTHER }
const BorrowTypeMap = new Map<number, string>()
for(const entry of Object.entries(BorrowType)){
  const t = entry[1]
  BorrowTypeMap.set(t.code, t.name)
}

export const GetBorrowTypeName = (code: number) => {
  return BorrowTypeMap.get(code) ?? ''
}

const BUSINESS_DOCUMENT_BORROW = { code: 10, name: '企业档案借阅' }
const CONTRACT_BORROW = { code: 20, name: '合同借阅' }
const INSTITUTION_BORROW = { code: 30, name: '制度借阅' }

export const BorrowDocumentType = { BUSINESS_DOCUMENT_BORROW, CONTRACT_BORROW, INSTITUTION_BORROW }
const BorrowDocumentTypeMap = new Map<number, string>()
for(const entry of Object.entries(BorrowDocumentType)){
  const t = entry[1]
  BorrowDocumentTypeMap.set(t.code, t.name)
}

export const GetBorrowDocumentTypeName = (code: number) => {
  return BorrowDocumentTypeMap.get(code) ?? ''
}

const NOT_LEND = { code: 10, name: '尚未出借' }
const LENDING = { code: 20, name: '出借中' }
const RETURN_BACK = { code: 50, name: '已归还' }
const NO_NEED_RETURN = { code: 60, name: '无需归还' }

export const LendState = { NOT_LEND, LENDING, RETURN_BACK, NO_NEED_RETURN }
const LendStateMap = new Map<number, string>()
for(const entry of Object.entries(LendState)){
  const t = entry[1]
  LendStateMap.set(t.code, t.name)
}

export const GetLendStateName = (code: number) => {
  return LendStateMap.get(code) ?? ''
}