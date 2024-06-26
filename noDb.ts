let listOfUrl = ["https://instagram.com/modelec_isen"];

Bun.serve({
    port: Bun.env.PORT || 8080,
    async fetch(req) {
        const url = new URL(req.url);
        if (req.method === "POST") {
            if (url.pathname === "/admin/add") {
                if (req.body) {
                    const { u, password } = await req.json() as { u: string, password: string };
                    if (u && password === Bun.env.ADMIN_PASSWORD) {
                        listOfUrl.push(u);

                        return new Response(JSON.stringify({body: u}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/clear") {
                if (req.body) {
                    const { password } = await req.json() as { password: string };
                    if (password === Bun.env.ADMIN_PASSWORD) {
                        listOfUrl = [];
                        return new Response(JSON.stringify({body: "ok"}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/list") {
                if (req.body) {
                    const {password} = await req.json() as { password: string };
                    if (password === Bun.env.ADMIN_PASSWORD) {
                        return new Response(JSON.stringify({body: listOfUrl}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/remove") {
                if (req.body) {
                    const { u, password } = await req.json() as { u: string, password: string };
                    if (u && password === Bun.env.ADMIN_PASSWORD) {
                        listOfUrl = listOfUrl.filter((url) => url !== u);
                        return new Response(JSON.stringify({body: u}), {
                            status: 200
                        })
                    }
                }
            }
        }
        else if (req.method === "GET") {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: listOfUrl[Math.floor(Math.random() * listOfUrl.length)]
                }
            })
        }
        return new Response("err", {
                status: 400
        })
    }
})