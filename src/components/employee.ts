import { Api } from "@/utils/request";

export const loadDeptEmp = (departmentId: string | number, resolve: (data: any[]) => void, finallyFn = () => { }) => {
  Api.req('/department-employee/load').query({ departmentId })
    .success((data: any[]) => {
      data = data ?? []
      data.forEach(t => t.text = t.label)
      data.forEach(t => !t.leaf ? t.children = [] : null)
      resolve(data);
    })
    .finally(finallyFn)
    .get();
}