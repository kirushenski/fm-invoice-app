require('dotenv').config()

const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  try {
    const { id } = event.queryStringParameters
    const { email } = context.clientContext.user

    const queryResponse = await fetch(process.env.HASURA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
        query: `query GetInvoiceByID($id: Int!) {
          invoices_by_pk(id: $id) {
            invoiceEmail: email,
            name
          }
        }`,
        variables: {
          id: Number(id),
        },
      }),
    })

    const { data: queryData, errors: queryErrors } = await queryResponse.json()

    if (!queryResponse.ok) {
      const error = new Error(queryErrors?.map(e => e.message).join('\n') ?? 'unknown')
      throw new Error(error)
    }

    const {
      invoices_by_pk: { invoiceEmail, name },
    } = queryData

    if (email !== invoiceEmail) {
      return {
        statusCode: '403',
        body: JSON.stringify({ message: `Not enough rights to delete invoice #${name}` }),
      }
    }

    const mutationResponse = await fetch(process.env.HASURA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
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
      }),
    })

    const { errors: mutationErrors } = await mutationResponse.json()

    if (!mutationResponse.ok) {
      const error = new Error(mutationErrors?.map(e => e.message).join('\n') ?? 'unknown')
      throw new Error(error)
    }

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
