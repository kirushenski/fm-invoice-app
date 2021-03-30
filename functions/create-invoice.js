const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  try {
    const { email } = context.clientContext.user
    const { createdAt, paymentTerms, paymentDue, ...invoiceData } = JSON.parse(event.body)

    const response = await fetch(process.env.HASURA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
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
          created_at: createdAt,
          payment_terms: paymentTerms.replace(/\s/g, '_'),
          payment_due: paymentDue,
          ...invoiceData,
        },
      }),
    })

    const { data, errors } = await response.json()

    if (!response.ok) {
      const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
      throw new Error(error)
    }

    const {
      insert_invoices_one: { name },
    } = data

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
