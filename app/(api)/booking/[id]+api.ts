import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id)
    return Response.json({ error: "Missing required fields" }, { status: 400 });

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
        SELECT
            bookings.booking_id,
            bookings.destination_address,
            bookings.destination_latitude,
            bookings.destination_longitude,
            bookings.serenade_duration,
            bookings.price,
            bookings.payment_status,
            bookings.created_at,
            bookings.reserved_at,
            json_build_object(
                'mariachi_id', m.id,
                'name', m.name,
                'profile_image_url', m.profile_image_url,
                'members', m.members,
                'rating', m.rating
            ) AS mariachi
        FROM 
            bookings
        INNER JOIN
            mariachis m ON bookings.mariachi_id = m.id
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
