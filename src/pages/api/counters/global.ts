import type { APIRoute } from "astro";
import { Counter, db, eq } from "astro:db";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const PUT: APIRoute = async ({ request }) => {
  try {
    await sleep(1000);

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
