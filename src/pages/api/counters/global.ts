import type { APIRoute } from "astro";
import { Counter, db } from "astro:db";


export const PUT: APIRoute = async ({ request }) => {
  try {
    const { active } = (await request.json()) as {
      active: boolean;
    };

    await db.update(Counter).set({ active: active });
    const counters = await db.select().from(Counter);

    return new Response(JSON.stringify({ counters }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};
