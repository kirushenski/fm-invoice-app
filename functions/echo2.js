console.log('log 1')

exports.handler = async () => {
  console.log(process.env.SOME_VAR)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: '123' }),
  }
}
