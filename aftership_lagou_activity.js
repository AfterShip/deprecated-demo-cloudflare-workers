addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

const gaScript = `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-120675951-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-120675951-2');
</script>
`;

async function fetchAndApply(request) {
  const { url, method } = request;

  if (url === 'https://jobs.aftershipdemo.com/' && method === 'GET') {
    const response = await fetch('https://activity.lagou.com/topic/040803AfterShiptopic.html');
    const body = await response.text();
    return new Response(body.replace('</head>', `${gaScript}</head>`), response);
  } else if (url.indexOf('https://jobs.aftershipdemo.com/') === 0) {
    const actual_url = url.replace('https://jobs.aftershipdemo.com/', 'https://activity.lagou.com/topic/');
    return fetch(actual_url);
  }

  return fetch(request);
}
