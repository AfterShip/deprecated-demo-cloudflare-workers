addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  // console.log('Got request', request)
  const response = await fetch(request)
  // console.log('Got response', response)
  let body = await response.text()
  // console.log(body)
  body = body.replace('Welcome','wELCOME')
  // console.log(body)
  return new Response(body,response)
}