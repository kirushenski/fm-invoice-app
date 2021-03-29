const generateInvoiceName = (names: string[]) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let name
  do {
    const letters = [...Array(2)].map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    const digits = [...Array(4)].map(() => Math.floor(Math.random() * 10))
    name = `${letters.join('')}${digits.join('')}`
  } while (names.includes(name))
  return name
}

export default generateInvoiceName
