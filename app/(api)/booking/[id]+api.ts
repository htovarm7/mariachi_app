import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id)
    return Response.json({ error: "Missing required fields" }, { status: 400 });

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
        SELECT
            bookings.mariachi_id,
            bookings.destination_address,
            bookings.destination_latitude,
            bookings.destination_longitude,
            bookings.price,
            bookings.payment_status,
            bookings.created_at,
            'mariachi', json_build_object(
                'mariachi_id', mariachi.id,
                'name', mariachis.name,
                'profile_image_url', mariachis.profile_image_url,
                'members', mariachis.members,
                'rating', mariachis.rating
            ) AS mariachi 
        FROM 
            bookings
        INNER JOIN
            mariachis ON bookings.mariachi_id = mariachi.id
        WHERE 
            bookings.user_id = ${id}
        ORDER BY 
            bookings.created_at DESC;
        `;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching recent bookings:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
