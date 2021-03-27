const { query } = require('./utils/hasura')

exports.handler = async () => {
  try {
    const { invoices } = await query({
      query: `query Invoices {
        invoices {
          id
          created_at
          payment_due
          payment_terms
          status
          sender {
            street
            city
            postCode
            country
          }
          client {
            name
            email
            street
            city
            postCode
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
    })

    return {
      statusCode: 200,
      body: JSON.stringify(invoices),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.toString()),
    }
  }
}
