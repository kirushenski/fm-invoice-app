function generateId() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const letters = [...Array(2)].map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
  const digits = [...Array(4)].map(() => Math.floor(Math.random() * 10))
  return `${letters.join('')}${digits.join('')}`
}

export default generateId
