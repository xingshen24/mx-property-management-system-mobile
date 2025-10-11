const WAIT_FOR_ENTRY = { code: 10, name: '等待入库' }
const IN_ENTRY = { code: 20, name: '入库中' }
const CANCEL = { code: 30, name: '取消入库' }
const FINISH = { code: 50, name: '入库完成' }

export const EntryOrderState = { WAIT_FOR_ENTRY, IN_ENTRY, CANCEL, FINISH }
const EntryOrderStateMap = new Map<number, string>()
for(const entry of Object.entries(EntryOrderState)){
  const t = entry[1]
  EntryOrderStateMap.set(t.code, t.name)
}

export const GetEntryOrderStateName = (code: number) => {
  return EntryOrderStateMap.get(code) ?? ''
}

const PURCHASE_ENTRY_ORDER = { code: 10, name: '采购入库单' }
const TRANSFER_ENTRY_ORDER = { code: 20, name: '调拨入库单' }

export const EntryOrderType = { PURCHASE_ENTRY_ORDER, TRANSFER_ENTRY_ORDER }
const EntryOrderTypeMap = new Map<number, string>()
for(const entry of Object.entries(EntryOrderType)){
  const t = entry[1]
  EntryOrderTypeMap.set(t.code, t.name)
}

export const GetEntryOrderTypeName = (code: number) => {
  return EntryOrderTypeMap.get(code) ?? ''
}
