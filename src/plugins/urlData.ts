export default class Url {
  constructor() {}

  createUrl(router: any, data: any, name: string): void {
    // ↓ избавляемся от пустых строк, null, 0 и ключа total
    const filteredData = Object.entries(data)
      .filter(([key, value]) => value !== '' && value !== null && value !== 0 && key !== 'total')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    router.push({
      name: name,
      query: { ...filteredData }
    })
  }
}
