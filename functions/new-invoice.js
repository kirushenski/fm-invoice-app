const { query } = require('./utils/hasura')

exports.handler = async (event, context) => {
  const { email } = context.clientContext.user
  const {
    id,
    createdAt,
    paymentTerms,
    paymentDue,
    sender: { postCode: senderPostCode, ...sender },
    client: { postCode: clientPostCode, ...client },
    ...newInvoice
  } = JSON.parse(event.body)

  try {
    await query({
      query: `mutation NewInvoice(
        $email: String!,
        $visible_id: String!,
        $created_at: date!,
        $payment_terms: payment_terms_enum!,
        $payment_due: date!,
        $status: statuses_enum!,
        $description: String!,
        $sender: contacts_insert_input!,
        $client: contacts_insert_input!
        $items: [items_insert_input!]!,
        $total: numeric!,
      ) {
        insert_invoices_one(object: {
          email: $email,
          visible_id: $visible_id,
          created_at: $created_at,
          payment_terms: $payment_terms,
          payment_due: $payment_due,
          status: $status,
          description: $description,
          sender: {data: $sender},
          client: {data: $client}
          items: {data: $items},
          total: $total,
        }) {}
      }`,
      variables: {
        email,
        visible_id: id,
        created_at: createdAt,
        payment_terms: paymentTerms.replace(/\s/g, '_'),
        payment_due: paymentDue,
        sender: { post_code: senderPostCode, ...sender },
        client: { post_code: clientPostCode, ...client },
        ...newInvoice,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Invoice #${id} is added` }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: ${e.message}` }),
    }
  }
}
