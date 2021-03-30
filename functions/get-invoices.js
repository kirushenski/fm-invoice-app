const fetch = require('node-fetch')

exports.handler = async (_, context) => {
  try {
    const { email } = context.clientContext.user

    const response = await fetch(process.env.HASURA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
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
      }),
    })

    const { data, errors } = await response.json()

    if (!response.ok) {
      const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
      throw new Error(error)
    }

    const { invoices } = data

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
