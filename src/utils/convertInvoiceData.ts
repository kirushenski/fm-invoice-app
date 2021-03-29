const convertInvoiceData = ({ created_at, payment_terms, payment_due, ...invoice }: InvoiceAPIData) =>
  ({
    createdAt: created_at,
    paymentTerms: payment_terms.replace(/_/g, ' '),
    paymentDue: payment_due,
    ...invoice,
  } as Invoice)

export default convertInvoiceData
