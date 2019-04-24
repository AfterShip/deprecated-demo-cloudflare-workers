addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

const endpoint1 = 'https://3jzner3bik.execute-api.us-west-2.amazonaws.com/test/demo-cloudflare-endpoint-1';
const endpoint2 = 'https://w82trwvw1k.execute-api.us-west-2.amazonaws.com/test/demo-cloudflare-endpoint-2';

async function fetchAndApply(request) {
  const { method, headers, url } = request;

  if (url === 'https://aftershipdemo.com/scenario-1/foo' && method === 'POST') {
    const newRequest = new Request(endpoint1, { method, headers, body: request.body });
    return fetch(newRequest);
  }

  if (url === 'https://aftershipdemo.com/scenario-1/bar' && method === 'POST') {
    const newRequest = new Request(endpoint2, { method, headers, body: request.body });
    return fetch(newRequest);
  }

  if (url === 'https://aftershipdemo.com/scenario-1/foobar' && method === 'POST') {
    const responses = await Promise.all([
      fetch(new Request(endpoint1, { method, headers, body: request.clone().body })),
      fetch(new Request(endpoint2, { method, headers, body: request.clone().body })),
    ]);
    const newResponse = new Response(JSON.stringify({
      endpoint1: await responses[0].json(),
      endpoint2: await responses[1].json(),
    }));
    newResponse.headers.set('Content-Type', 'application/json');
    return newResponse;
  }

  return fetch(request);
}