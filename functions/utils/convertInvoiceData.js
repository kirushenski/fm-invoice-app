exports.convertInvoiceData = ({
  createdAt,
  paymentTerms,
  paymentDue,
  sender: { postCode: senderPostCode, ...sender },
  client: { postCode: clientPostCode, ...client },
  ...invoice
}) => ({
  created_at: createdAt,
  payment_terms: paymentTerms.replace(/\s/g, '_'),
  payment_due: paymentDue,
  sender: { post_code: senderPostCode, ...sender },
  client: { post_code: clientPostCode, ...client },
  ...invoice,
})
