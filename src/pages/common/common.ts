export interface IdName {
  id: number;
  name: string;
}

export const collectName = (idNames: IdName[]) => {
  if (idNames == null) {
    return ''
  }
  const nameArr = <String[]>[];
  for (const idName of idNames) {
    nameArr.push(idName.name ?? '');
  }
  return nameArr.join('，')
}