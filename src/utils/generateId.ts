function generateId(ids: string[]) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let id
  do {
    const letters = [...Array(2)].map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    const digits = [...Array(4)].map(() => Math.floor(Math.random() * 10))
    id = `${letters.join('')}${digits.join('')}`
  } while (ids.includes(id))

  return id
}

export default generateId
