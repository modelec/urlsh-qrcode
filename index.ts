import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

Bun.serve({
    port: Bun.env.PORT || 8080,
    async fetch(req) {
        const url = new URL(req.url);
        if (req.method == "POST" && url.pathname == "/admin") {
            if (req.body) {
                const { urlData, password } = await req.json() as { urlData: string, password: string };
                if (urlData && password == Bun.env.ADMIN_PASSWORD) {
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
        }
        else if (req.method == "GET") {
            const urlRes = await prisma.url.findFirst({
                orderBy: {
                    updatedAt: "desc"
                }
            });
    
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