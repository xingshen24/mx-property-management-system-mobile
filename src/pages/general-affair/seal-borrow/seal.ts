import { Api } from "@/utils/request"

const OFFICIAL_SEAL = { code: 10, name: '公章' }
const SIGNATURE = { code: 20, name: '签章' }
const UNION_SEAL = { code: 30, name: '工会章' }
const UNION_FINANCIAL_SEAL = { code: 40, name: '工会财务章' }
const COMMITTEE = { code: 50, name: '业委会章' }

export const SealType = { OFFICIAL_SEAL, SIGNATURE, UNION_SEAL, UNION_FINANCIAL_SEAL, COMMITTEE }
const SealTypeMap = new Map<number, string>()
for (const entry of Object.entries(SealType)) {
  const t = entry[1]
  SealTypeMap.set(t.code, t.name)
}

export const GetSealTypeName = (code: number) => {
  return SealTypeMap.get(code) ?? ''
}

interface Seal {
  id: number;
  name: string;
}

export const loadSeals = (fn: (seals: Seal[]) => void) => {
  Api.req('/seal/list').success((seals: Seal[]) => fn(seals)).get();
}

const NOT_RETURN = { code: 10, name: '未归还' }
const RETURNED = { code: 20, name: '已归还' }

export const BorrowReturnState = { NOT_RETURN, RETURNED }
const BorrowReturnStateMap = new Map<number, string>()
for(const entry of Object.entries(BorrowReturnState)){
  const t = entry[1]
  BorrowReturnStateMap.set(t.code, t.name)
}

export const GetBorrowReturnStateName = (code: number) => {
  return BorrowReturnStateMap.get(code) ?? ''
}


