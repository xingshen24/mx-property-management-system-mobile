export const needChoose = (label: string) => {
  return { required: true, message: `请选择${label}` }
}

export const needInput = (label: string) => {
  return { required: true, message: `请输入${label}` }
}
