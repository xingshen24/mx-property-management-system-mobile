export function coverReactive(form: any, data: any) {
  const entries = Object.entries(data)
  for (const entry of entries) {
    const key = entry[0]
    const value = entry[1]
    form[key] = value
  }
}


export const callPhone = (phone: string) => {
  window.location.href = `tel:${phone}`
}