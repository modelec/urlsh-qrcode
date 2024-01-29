let urlToRedirect = "https://instagram.com/modelec_isen";

Bun.serve({
    port: Bun.env.PORT || 8080,
    async fetch(req) {
        const url = new URL(req.url);
        if (req.method === "POST" && url.pathname === "/admin") {
            if (req.body) {
                const { u, password } = await req.json() as { u: string, password: string };
                if (u && password === Bun.env.ADMIN_PASSWORD) {
                    urlToRedirect = u;

                    return new Response(JSON.stringify({body: u}), {
                        status: 200
                    })
                }
            }
        }
        else if (req.method === "GET") {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: urlToRedirect
                }
            })
        }
        return new Response("err", {
                status: 400
        })
    }
})