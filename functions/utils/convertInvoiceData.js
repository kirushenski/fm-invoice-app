exports.convertInvoiceData = ({ createdAt, paymentTerms, paymentDue, ...invoice }) => ({
  created_at: createdAt,
  payment_terms: paymentTerms.replace(/\s/g, '_'),
  payment_due: paymentDue,
  ...invoice,
})
