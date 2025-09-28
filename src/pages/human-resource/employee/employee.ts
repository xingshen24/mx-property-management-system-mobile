export const ContractTypeOptions = [
  { label: '劳动合同', value: 10 },
  { label: '劳务聘用', value: 20 },
]

const LABOR_CONTRACT = { code: 10, name: "劳动合同" }
const SERVICE_CONTRACT = { code: 20, name: '劳务聘用' }

export const EmployeeContractType = { LABOR_CONTRACT, SERVICE_CONTRACT }
const EmployeeContractTypeMap = new Map<number, string>();

for (const entry of Object.entries(EmployeeContractType)) {
  const t = entry[1]
  EmployeeContractTypeMap.set(t.code, t.name)
}

export const GetEmployeeContractTypeName = (code: number) => {
  return EmployeeContractTypeMap.get(code) ?? ''
}

export const ContractTermTypeOptions = [
  { label: '固定期限', value: 10 },
  { label: '无固定期限', value: 20 },
]

const FIXED_TERM = { code: 10, name: "固定期限" };
const NO_FIXED_TERM = { code: 20, name: "无固定期限" };

export const ContractTermType = { FIXED_TERM, NO_FIXED_TERM };
const ContractTermTypeMap = new Map<number, string>();

for (const entry of Object.entries(ContractTermType)) {
  const t = entry[1]
  ContractTermTypeMap.set(t.code, t.name);
}

export const GetContractTermTypeName = (code: number) => {
  return ContractTermTypeMap.get(code) ?? ''
}

export const GenderOptions = [
  { label: '男', value: 10 },
  { label: '女', value: 20 }
]

const MALE = { code: 10, name: '男' }
const FEMALE = { code: 20, name: '女' }

export const Gender = { MALE, FEMALE };

const GenderNameMap = new Map<number, string>();
for (const entry of Object.entries(Gender)) {
  const t = entry[1];
  GenderNameMap.set(t.code, t.name);
}

export const GetGenderNameByCode = (code: number) => {
  return GenderNameMap.get(code) ?? ''
}

export const restDayFormat = (restDay: number, row: any) => {
  if (row.contractTermType == 20) {
    return '无固定期限'
  }
  return restDay;
}

const ON_DUTY = { code: 10, name: "在职" }
const RESIGN = { code: 20, name: "离职" }

export const JobStatus = { ON_DUTY, RESIGN };
const JobStatusMap = new Map<number, string>();
for (const entry of Object.entries(JobStatus)) {
  const t = entry[1];
  JobStatusMap.set(t.code, t.name);
}

export const GetJobStatusName = (code: number) => {
  return JobStatusMap.get(code) ?? '';
}

const SOCIAL = { code: 10, name: "社保" }
const COMMERCIAL = { code: 20, name: "商保" }

export const InsuranceType = { SOCIAL, COMMERCIAL }
const InsuranceTypeMap = new Map<number, string>();
for (const entry of Object.entries(InsuranceType)) {
  const t = entry[1];
  InsuranceTypeMap.set(t.code, t.name);
}

export const GetInsuranceTypeName = (code: number) => {
  return InsuranceTypeMap.get(code) ?? '';
}

const INSURED = { code: 10, name: "参保" }
const NOT_INSURED = { code: 20, name: "未参保" };

export const InsuranceState = { INSURED, NOT_INSURED };
const InsuranceStateMap = new Map<number, string>();

for (const entry of Object.entries(InsuranceState)) {
  const t = entry[1];
  InsuranceStateMap.set(t.code, t.name);
}

export const GetInsuranceStateName = (code: number) => {
  return InsuranceStateMap.get(code) ?? ''
}

