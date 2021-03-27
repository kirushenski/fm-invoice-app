const fetch = require('node-fetch')

exports.query = async ({ query, variables = {} }) => {
  const response = await fetch(process.env.HASURA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  }).then(response => response.json())

  if (response.errors) {
    throw new Error(response.errors[0].message)
  } else {
    return response.data
  }
}
