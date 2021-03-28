const { query } = require('./utils/hasura')

exports.handler = async (_, context) => {
  const { email } = context.clientContext.user

  try {
    const { invoices } = await query({
      query: `query Invoices($email: String!) {
        invoices(where: {email: {_eq: $email}}) {
          visible_id
          created_at
          payment_due
          payment_terms
          description
          status
          sender {
            street
            city
            post_code
            country
          }
          client {
            name
            email
            street
            city
            post_code
            country
          }
          items {
            name
            quantity
            price
            total
          }
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
