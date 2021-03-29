const { query } = require('./utils/hasura')
const { convertInvoiceData } = require('./utils/convertInvoiceData')

exports.handler = async event => {
  const invoiceData = convertInvoiceData(JSON.parse(event.body))

  try {
    const { name } = await query({
      query: `mutation EditInvoice(
        $id: Int!,
        $name: String!,
        $created_at: date!,
        $payment_terms: payment_terms_enum!,
        $payment_due: date!,
        $status: statuses_enum!,
        $description: String!,
        $sender: contacts_insert_input!,
        $client: contacts_insert_input!
        $items: [items_insert_input!]!,
        $total: numeric!,
      ) {
        update_invoices_by_pk(pk_columns: {id: $id}, _set: {
          name: $name,
          created_at: $created_at,
          payment_terms: $payment_terms,
          payment_due: $payment_due,
          status: $status,
          description: $description,
          sender: {data: $sender},
          client: {data: $client}
          items: {data: $items},
          total: $total,
        }) {
          name
        }
      }`,
      variables: invoiceData,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Invoice #${name} is edited` }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: ${e.message}` }),
    }
  }
}
