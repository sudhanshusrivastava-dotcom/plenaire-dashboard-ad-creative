export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const account_id = url.searchParams.get("account_id");
    const fields = url.searchParams.get("fields");

    if (!env.WINDSOR_API_KEY) {
      return new Response(JSON.stringify({ error: "WINDSOR_API_KEY is not set in environment variables" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const windsorUrl = `https://connectors.windsor.ai/facebook?api_key=${env.WINDSOR_API_KEY}&account_ids=${account_id}&date_preset=last_14d&fields=${fields}`;

    const response = await fetch(windsorUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
