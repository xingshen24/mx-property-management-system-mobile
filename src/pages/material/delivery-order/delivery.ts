const TRANSFER_DELIVERY_ORDER = { code: 10, name: '调拨出库' }
const ALLOCATE_DELIVERY_ORDER = { code: 20, name: '领用出库' }

export const DeliveryOrderType = { TRANSFER_DELIVERY_ORDER, ALLOCATE_DELIVERY_ORDER }
const DeliveryOrderTypeMap = new Map<number, string>()
for(const entry of Object.entries(DeliveryOrderType)){
  const t = entry[1]
  DeliveryOrderTypeMap.set(t.code, t.name)
}

export const GetDeliveryOrderTypeName = (code: number) => {
  return DeliveryOrderTypeMap.get(code) ?? ''
}

const WAIT_FOR_DELIVERY = { code: 10, name: '等待出库' }
const IN_DELIVERY = { code: 40, name: '出库中' }
const CANCEL = { code: 60, name: '取消出库' }
const FINISH = { code: 80, name: '出库完成' }

export const DeliveryOrderState = { WAIT_FOR_DELIVERY, IN_DELIVERY, CANCEL, FINISH }
const DeliveryOrderStateMap = new Map<number, string>()
for(const entry of Object.entries(DeliveryOrderState)){
  const t = entry[1]
  DeliveryOrderStateMap.set(t.code, t.name)
}

export const GetDeliveryOrderStateName = (code: number) => {
  return DeliveryOrderStateMap.get(code) ?? ''
}
