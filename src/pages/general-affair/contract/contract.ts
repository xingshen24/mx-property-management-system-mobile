
export const areaFormat = (val?: number) => {
  if (val == null || val == 0) {
    return '0';
  } else {
    return val + '㎡';
  }
}

const PART_A = { code: 10, name: "甲方" }
const PART_B = { code: 20, name: "乙方" }
const PART_C = { code: 30, name: "丙方" }

export const CompanySide = { PART_A, PART_B, PART_C };
const CompanySideMap = new Map<number, string>();
for (const entry of Object.entries(CompanySide)) {
  const t = entry[1];
  CompanySideMap.set(t.code, t.name);
}

export const GetCompanySideName = (code: number) => {
  return CompanySideMap.get(code) ?? '';
}

const PER_MONTH = { code: 100, name: "按月支付" };
const PER_DOUBLE_MONTH = { code: 200, name: "按双月支付" };
const PER_QUARTER = { code: 300, name: "按季度支付" };
const PER_HALF_YEAR = { code: 400, name: "半年一付" };
const PER_YEAR = { code: 500, name: "按年支付" };
const INSTALLMENT = { code: 600, name: "分期支付" };

export const ContractPaymentType = { PER_MONTH, PER_DOUBLE_MONTH, PER_QUARTER, PER_HALF_YEAR, PER_YEAR, INSTALLMENT };

const ContractPaymentTypeMap = new Map<number, string>();
for (const entry of Object.entries(ContractPaymentType)) {
  const t = entry[1];
  ContractPaymentTypeMap.set(t.code, t.name);
}

export const GetContractPaymentTypeName = (code: number) => {
  return ContractPaymentTypeMap.get(code) ?? '';
}

export const contractProgress = (row: any) => {
  const daysRemaining = row.daysRemaining;
  const totalDays = row.totalDays;
  if (daysRemaining == null || totalDays == null) {
    return 0;
  }
  return 100 * Number.parseFloat((daysRemaining / totalDays).toFixed(2))
}

export const contractStatus = (daysRemaining: number | null) => {
  return (daysRemaining == null || daysRemaining > 30) ? '' : 'exception'
}

const INCOME = { code: 10, name: "收款" };
const EXPENDITURE = { code: 20, name: "支付" };

export const IncomeExpenditureType = { INCOME, EXPENDITURE }
const IncomeExpenditureTypeMap = new Map<number, string>();
for (const entry of Object.entries(IncomeExpenditureType)) {
  const t = entry[1];
  IncomeExpenditureTypeMap.set(t.code, t.name);
}

export const GetIncomeExpenditureTypeName = (code: number) => {
  return IncomeExpenditureTypeMap.get(code);
}

