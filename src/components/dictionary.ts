import { Api } from "@/utils/request";

const LOAD_DICT_URL = '/dictionary/load-tree-by-category-code';
const LOAD_CATEGORY_URL = '/dictionary-category/load-by-code';
const LOAD_DICT_BY_CATEGORY_AND_PARENT_CODE = '/dictionary/load-by-category-code-parent-code';

const LIST = { code: 10, name: "列表结构" }
const TREE = { code: 20, name: "树形结构" };

export const DictionaryCategoryStructure = {
  LIST, TREE
};

export interface DictionaryTreeNode {
  id: number;
  categoryId: number;
  parent: number;
  dictCode: string;
  dictName: string;
  dictDesc: string;
  path: string;
  isLeafNode: boolean;
  sortNo: number;
  children: DictionaryTreeNode[]
}

type ResolveSingle = (tree: DictionaryTreeNode[]) => void;

type DictResult = Record<string, DictionaryTreeNode[]>;

type Resolve = (data: DictResult) => void;

export const loadDictOption = (category: string, resolve: ResolveSingle) => {
  const params = { categoryCodes: category }
  Api.req(LOAD_DICT_URL).query(params).success((data: DictResult) => {
    resolve(data[category]);
  }).get();
}

export const loadDictOptions = (categoryCodes: string[], resovle: Resolve) => {
  Api.req(LOAD_DICT_URL).query({ categoryCodes }).success((data: DictResult) => {
    resovle(data);
  }).get();
}

export interface DictionaryCategory {
  id: number;
  categoryCode: string;
  categoryDesc: string;
  structure: number;
}

type ResolveCategory = (data: DictionaryCategory) => void;

export const loadCategory = (category: string, resolve: ResolveCategory) => {
  const param = { code: category }
  Api.req(LOAD_CATEGORY_URL).query(param).success((data: DictionaryCategory) => {
    resolve(data);
  }).get();
}

type ResolveDictionary = (data: DictionaryTreeNode[]) => void;
export const loadDictByParentCode = (categoryCode: string, parentCode: string, resolve: ResolveDictionary) => {
  const param = { categoryCode, parentCode }
  Api.req(LOAD_DICT_BY_CATEGORY_AND_PARENT_CODE).query(param).success((data: DictionaryTreeNode[]) => {
    resolve(data);
  }).get();
}
