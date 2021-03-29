const { query } = require('./utils/hasura')
const { convertInvoiceData } = require('./utils/convertInvoiceData')

exports.handler = async (event, context) => {
  try {
    const { email } = context.clientContext.user
    const invoiceData = convertInvoiceData(JSON.parse(event.body))

    const {
      insert_invoices_one: { name },
    } = await query({
      query: `mutation CreateInvoice(
        $email: String!,
        $name: String!,
        $created_at: date!,
        $payment_terms: payment_terms_enum!,
        $payment_due: date!,
        $status: statuses_enum!,
        $description: String!,
        $sender: jsonb!,
        $client: jsonb!
        $items: jsonb!,
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
          sender: $sender,
          client: $client,
          items: $items,
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
