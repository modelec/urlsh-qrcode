import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

Bun.serve({
    port: Bun.env.PORT || 8080,
    async fetch(req) {
        const url = new URL(req.url);
        if (req.method === "POST") {
            if (url.pathname === "/admin") {
                if (req.body) {
                    const { urlData, password } = await req.json() as { urlData: string, password: string };
                    if (urlData && password === Bun.env.ADMIN_PASSWORD) {
                        const u = await prisma.url.create({
                            data: {
                                url: urlData
                            }
                        })

                        return new Response(JSON.stringify({body: u}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/clear") {
                if (req.body) {
                    const { password } = await req.json() as { password: string };
                    if (password === Bun.env.ADMIN_PASSWORD) {
                        await prisma.url.deleteMany();
                        return new Response(JSON.stringify({body: "ok"}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/list") {
                if (req.body) {
                    const {password} = await req.json() as { password: string };
                    if (password === Bun.env.ADMIN_PASSWORD) {
                        const urls = await prisma.url.findMany();
                        return new Response(JSON.stringify({body: urls}), {
                            status: 200
                        })
                    }
                }
            } else if (url.pathname == "/admin/remove") {
                if (req.body) {
                    const { u, password } = await req.json() as { u: string, password: string };
                    if (u && password === Bun.env.ADMIN_PASSWORD) {
                        await prisma.url.deleteMany({
                            where: {
                                url: u
                            }
                        })
                        return new Response(JSON.stringify({body: u}), {
                            status: 200
                        })
                    }
                }
            }
        }
        else if (req.method === "GET") {
            // random
            const urls = await prisma.url.findMany();

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