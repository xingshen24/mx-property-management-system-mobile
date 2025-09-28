import { Api } from "./request";

export interface DepartmentTree {
  id: number;
  deptNo: string;
  deptName: string;
  parentId: number | null;
  deptHeadId: number | null;
  deptHeadName: string;
  deptHeadPhoneNumber: string;
  deptType: number | string;
  description: string | null;
  path: string;
  sortNo: number;
  children: DepartmentTree[] | null;
}

export const loadDeptTree = (fn: (data: DepartmentTree[]) => void) => {
  Api.req("/department/query").success((data: DepartmentTree[]) => {
    fn(data)
  }).get();
}