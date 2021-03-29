const { query } = require('./utils/hasura')

exports.handler = async (_, context) => {
  try {
    const { email } = context.clientContext.user

    const { invoices } = await query({
      query: `query GetInvoices($email: String!) {
        invoices(where: {email: {_eq: $email}}, order_by: {id: asc}) {
          id
          name
          created_at
          payment_due
          payment_terms
          description
          status
          sender
          client
          items
          total
        }
      }`,
      variables: {
        email,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(invoices),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: ${e.message}` }),
    }
  }
}
