addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  
  const cookie_name = 'group'
  let group          // 'control' or 'test', set below
  let isNew = false

  const cookie = request.headers.get('Cookie')

  if (cookie && cookie.includes(`${cookie_name}=control`)) {
    group = 'control'
  } else if (cookie && cookie.includes(`${cookie_name}=test`)) {
    group = 'test'
  } else {
    group = Math.random() < 0.5 ? 'control' : 'test'
    isNew = true}


  let url = new URL(request.url)
  
  if (group=='test')
  {
    url.hostname = 'test2-domain.example.com'
  }
  request = new Request(url, request)
  let response = await fetch(request)


  if (isNew) {
    // The experiment was newly-assigned, so add a Set-Cookie header
    // to the response. We need to re-construct the response to make
    // the headers mutable.
    response = new Response(response.body, response)
    response.headers.append('Set-Cookie', `${cookie_name}=${group}; path=/`)
  }


  return response
}