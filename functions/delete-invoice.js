const { query } = require('./utils/hasura')

exports.handler = async (event, context) => {
  try {
    const { id } = event.queryStringParameters
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
        id: Number(id),
      },
    })

    if (email !== invoiceEmail) {
      return {
        statusCode: '403',
        body: JSON.stringify({ message: `Not enough rights to delete invoice #${name}` }),
      }
    }

    await query({
      query: `mutation DeleteInvoice(
        $id: Int!
      ) {
        delete_invoices_by_pk(id: $id) {
          name
        }
      }`,
      variables: {
        id: Number(id),
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Invoice #${name} is deleted` }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: ${e.message}` }),
    }
  }
}
