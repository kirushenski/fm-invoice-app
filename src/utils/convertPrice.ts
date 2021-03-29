const convertPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(price).replace(/^(\D)/, '$1 ')

export default convertPrice
