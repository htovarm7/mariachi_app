import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`SELECT * FROM mariachis`;

    return Response.json({ data: response });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error: error });
  }
}
