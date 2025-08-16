import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      destination_address,
      destination_latitude,
      destination_longitude,
      price,
      payment_status,
      mariachi_id,
      user_id,
      reserved_at,
      serenade_time,
    } = body;

    if (
      !destination_address ||
      !destination_latitude ||
      !destination_longitude ||
      !price ||
      !payment_status ||
      !mariachi_id ||
      !user_id
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
        INSERT INTO bookings ( 
          destination_address,  
          destination_latitude, 
          destination_longitude, 
          price, 
          payment_status, 
          mariachi_id, 
          user_id,
          reserved_at,
          serenade_time
        ) VALUES (
          ${destination_address},
          ${destination_latitude},
          ${destination_longitude},
          ${price},
          ${payment_status},
          ${mariachi_id},
          ${user_id},
          ${reserved_at || new Date().toISOString()},
          ${serenade_time || 60}
        )
        RETURNING *;
        `;

    return Response.json({ data: response[0] }, { status: 201 });
  } catch (error) {
    console.error("Error inserting data into recent_rides:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
