import { db, Counter } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Counter).values([
		{
			id: 1,
			value: 1,
			active: true
		},
		{
			id: 2,
			value: 2,
			active: true
		},
		{
			id: 3,
			value: 3,
			active: true
		},
	])
}
