import type { APIRoute } from "astro";
import { db, Counter, eq } from "astro:db";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const GET: APIRoute = async () => {
  try {
    await sleep(1000);

    const counters = await db.select().from(Counter);
    return new Response(JSON.stringify({ counters }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};

export const POST: APIRoute = async () => {
  try {
    await sleep(1000);

    await db.insert(Counter).values({ value: 0, active: true }).returning();

    const counters = await db.select().from(Counter);
    return new Response(JSON.stringify({ counters }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    await sleep(1000);

    const { index } = (await request.json()) as { index: number };

    await db.delete(Counter).where(eq(Counter.id, index));

    const counters = await db.select().from(Counter);

    return new Response(JSON.stringify({ counters }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    await sleep(1000);

    const { index, active, value } = (await request.json()) as {
      index: number;
      value: number;
      active: boolean;
    };    

    await db
      .update(Counter)
      .set({ active, value })
      .where(eq(Counter.id, index));

    const counters = await db.select().from(Counter);

    return new Response(JSON.stringify({ counters }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};
