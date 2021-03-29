const convertInvoiceData = ({
  created_at,
  payment_terms,
  payment_due,
  sender: { post_code: sender_post_code, ...sender },
  client: { post_code: client_post_code, ...client },
  ...invoice
}: InvoiceAPIData) =>
  ({
    createdAt: created_at,
    paymentTerms: payment_terms.replace(/_/g, ' '),
    paymentDue: payment_due,
    sender: { ...sender, postCode: sender_post_code },
    client: { ...client, postCode: client_post_code },
    ...invoice,
  } as Invoice)

export default convertInvoiceData
