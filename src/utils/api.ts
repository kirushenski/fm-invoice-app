import convertInvoiceData from '@/utils/convertInvoiceData'

export const getInvoices = async (token: string) => {
  try {
    const response = await fetch('/.netlify/functions/get-invoices', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Invoices cannot be fetched')
    const data: InvoiceAPIData[] = await response.json()
    return data.map(convertInvoiceData)
  } catch (e) {
    console.error(e)
  }
}

export const createInvoice = async (token: string, invoice: CreatedInvoice) => {
  try {
    const response = await fetch('/.netlify/functions/create-invoice', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(invoice),
    })
    if (!response.ok) throw new Error('Invoice cannot be created')
  } catch (e) {
    console.error(e)
  }
}

export const editInvoice = async (token: string, invoice: Invoice) => {
  try {
    const response = await fetch('/.netlify/functions/edit-invoice', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(invoice),
    })
    if (!response.ok) throw new Error('Invoice cannot be edited')
  } catch (e) {
    console.error(e)
  }
}
