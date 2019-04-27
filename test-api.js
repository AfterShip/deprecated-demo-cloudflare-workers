addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  var response={"message":("Hi, this is worker. Now is" + new Date()),
  "example":{"item1":1,"item2":2}}

  return new Response(JSON.stringify(response),
  {status:200,headers:{"Content-Type":"application/json"}})
}