exports.handler = async () => {
  console.log('Are ou fuckin imaginery?')
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  }
}
