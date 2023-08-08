export default class Text {
  constructor() {}

  maxSymbols(text: string, maxLength: number): string {
    return text?.length > maxLength ? String(text).substring(0, maxLength) + '...' : text
  }
}
