const UNPAID = { code: 10, name: '未支付' }
const PART_PAID = { code: 20, name: '部分支付' }
const PAID = { code: 30, name: '已支付' }

export const PaymentState = { UNPAID, PART_PAID, PAID }
const PaymentStateMap = new Map<number, string>()
for(const entry of Object.entries(PaymentState)){
  const t = entry[1]
  PaymentStateMap.set(t.code, t.name)
}

export const GetPaymentStateName = (code: number) => {
  return PaymentStateMap.get(code) ?? ''
}
const PROPERTY_FEE = { code: 10, name: '物业费' }
const UTILITY_BILL = { code: 20, name: '水电费' }
const PARKING_FEE = { code: 30, name: '停车费' }
const SERVICE_FEE = { code: 40, name: '服务费' }
const MAINTENANCE_COST = { code: 50, name: '维修费' }

export const FeeType = { PROPERTY_FEE, UTILITY_BILL, PARKING_FEE, SERVICE_FEE, MAINTENANCE_COST }
const FeeTypeMap = new Map<number, string>()
for(const entry of Object.entries(FeeType)){
  const t = entry[1]
  FeeTypeMap.set(t.code, t.name)
}

export const GetFeeTypeName = (code: number) => {
  return FeeTypeMap.get(code) ?? ''
}

