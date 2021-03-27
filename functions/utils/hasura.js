const fetch = require('node-fetch')

exports.query = async ({ query, variables = {} }) => {
  const response = await fetch(process.env.HASURA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  })

  const { data, errors } = await response.json()

  if (response.ok) {
    return data
  } else {
    const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
    return Promise.reject(error)
  }
}
