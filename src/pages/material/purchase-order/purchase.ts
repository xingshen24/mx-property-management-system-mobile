const UNACCEPTED = { code: 10, name: '未验收' }
const IN_ACCEPT = { code: 20, name: '验收中' }
const CANCEL_ACCEPT = { code: 30, name: '取消验收' }
const ACCEPTED = { code: 50, name: '已验收' }

export const PurchaseOrderAcceptState = { UNACCEPTED, IN_ACCEPT, CANCEL_ACCEPT, ACCEPTED }
const PurchaseOrderAcceptStateMap = new Map<number, string>()
for (const entry of Object.entries(PurchaseOrderAcceptState)) {
  const t = entry[1]
  PurchaseOrderAcceptStateMap.set(t.code, t.name)
}

export const GetPurchaseOrderAcceptStateName = (code: number) => {
  return PurchaseOrderAcceptStateMap.get(code) ?? ''
}

export interface PurchaseOrderItem {
  id: number;
  orderId: number;
  orderNo: string;
  materialId: number;
  materialName: string;
  specificationId: number;
  unit: string;
  specificationName: string;
  specification: string;
  number: number;
  price: number;
  totalAmount: number;
  purposeDictId: number;
  remark: string;
}