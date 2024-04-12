import { Database } from "bun:sqlite";

const db = new Database(Bun.env.BUN_DB_FILE || "./bun.db");

db.query("CREATE TABLE IF NOT EXISTS Url (url TEXT)").run();

Bun.serve({
    port: Bun.env.PORT || 8080,
    async fetch(req) {
        const url = new URL(req.url);
        if (req.method === "POST") {
            if (url.pathname === "/admin/add") {
                if (req.body) {
                    const { u, password } = await req.json() as { u: string, password: string };
                    if (u && password === Bun.env.ADMIN_PASSWORD) {
                        const query = db.query("INSERT INTO Url (url) VALUES ($u) RETURNING *");

                        const results = query.get({
                            $u: u,
                        });

                        return new Response(JSON.stringify({body: results}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/clear") {
                if (req.body) {
                    const { password } = await req.json() as { password: string };
                    if (password === Bun.env.ADMIN_PASSWORD) {
                        db.query("DELETE FROM Url").run();
                        return new Response(JSON.stringify({body: "ok"}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/list") {
                if (req.body) {
                    const {password} = await req.json() as { password: string };
                    if (password === Bun.env.ADMIN_PASSWORD) {
                        const urls = db.query("SELECT * FROM Url").all();
                        return new Response(JSON.stringify({body: urls}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/remove") {
                if (req.body) {
                    const { u, password } = await req.json() as { u: string, password: string };
                    if (u && password === Bun.env.ADMIN_PASSWORD) {
                        db.query("DELETE FROM Url WHERE url = $u").run({
                            $u: u,
                        });
                        return new Response(JSON.stringify({body: u}), {
                            status: 200
                        })
                    }
                }
            }
        }
        else if (req.method === "GET") {
            // random
            const urls = db.query("SELECT * FROM Url").all() as any[];
            const urlRes = urls[Math.floor(Math.random() * urls.length)];

            if (urlRes) {
                return new Response(null, {
                    status: 302,
                    headers: {
                        Location: urlRes.url
                    }
                })
            }
        }
        return new Response("err", {
                status: 400
        })
    }
})

process.on("exit", async () => {
    db.close();
});