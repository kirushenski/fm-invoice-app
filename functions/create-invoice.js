const { query } = require('./utils/hasura')
const { convertInvoiceData } = require('./utils/convertInvoiceData')

exports.handler = async (event, context) => {
  const { email } = context.clientContext.user
  const invoiceData = convertInvoiceData(JSON.parse(event.body))

  try {
    const { name } = await query({
      query: `mutation NewInvoice(
        $email: String!,
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
        insert_invoices_one(object: {
          email: $email,
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
      variables: {
        email,
        ...invoiceData,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Invoice #${name} is added` }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: ${e.message}` }),
    }
  }
}
