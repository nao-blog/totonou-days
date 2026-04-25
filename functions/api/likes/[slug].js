export async function onRequest(context) {
  const { slug } = context.params;
  const { BLOG_DATA } = context.env;
  const key = `likes:${slug}`;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  if (context.request.method === 'POST') {
    const current = parseInt(await BLOG_DATA.get(key) || '0');
    const next = current + 1;
    await BLOG_DATA.put(key, String(next));
    return new Response(JSON.stringify({ likes: next }), { headers });
  }

  const likes = parseInt(await BLOG_DATA.get(key) || '0');
  return new Response(JSON.stringify({ likes }), { headers });
}
