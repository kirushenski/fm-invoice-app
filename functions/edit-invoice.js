require('dotenv').config()

const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  try {
    const { createdAt, paymentTerms, paymentDue, ...invoiceData } = JSON.parse(event.body)
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
          id: invoiceData.id,
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
        body: JSON.stringify({ message: `Not enough rights to edit invoice #${name}` }),
      }
    }

    const mutationResponse = await fetch(process.env.HASURA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
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
        variables: {
          created_at: createdAt,
          payment_terms: paymentTerms.replace(/\s/g, '_'),
          payment_due: paymentDue,
          ...invoiceData,
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
      body: JSON.stringify({ message: `Invoice #${name} is edited` }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: ${e.message}` }),
    }
  }
}
