const { query } = require('./utils/hasura')

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters
  const { email } = context.clientContext.user

  const { invoiceEmail, name } = await query({
    query: `query GetInvoiceByID($id: Int!) {
      invoices_by_pk(id: $id) {
        invoiceEmail: email,
        name
      }
    }`,
    variables: {
      id,
    },
  })

  if (email !== invoiceEmail) {
    return {
      statusCode: '403',
      body: JSON.stringify({ message: `Not enough rights to delete invoice #${name}` }),
    }
  }

  try {
    await query({
      query: `mutation DeleteInvoice(
        $id: Int!
      ) {
        delete_invoices_by_pk(id: $id) {}
      }`,
      variables: {
        id,
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
