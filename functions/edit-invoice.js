const { query } = require('./utils/hasura')
const { convertInvoiceData } = require('./utils/convertInvoiceData')

exports.handler = async (event, context) => {
  try {
    const invoiceData = convertInvoiceData(JSON.parse(event.body))
    const { email } = context.clientContext.user

    const {
      invoices_by_pk: { invoiceEmail, name },
    } = await query({
      query: `query GetInvoiceByID($id: Int!) {
        invoices_by_pk(id: $id) {
          invoiceEmail: email,
          name
        }
      }`,
      variables: {
        id: invoiceData.id,
      },
    })

    if (email !== invoiceEmail) {
      return {
        statusCode: '403',
        body: JSON.stringify({ message: `Not enough rights to edit invoice #${name}` }),
      }
    }

    await query({
      query: `mutation EditInvoice(
        $id: Int!,
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
        update_invoices_by_pk(pk_columns: {id: $id}, _set: {
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
