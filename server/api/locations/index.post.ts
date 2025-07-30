import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

import * as z from "zod";

const bodySchema = z.object({
  name: z.string(),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
  latitude: z.number(),
  longitude: z.number(),
});

export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "You must be logged in to access this resource.",
    });
  }

  const { name, tags, longitude, latitude } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  const supabase = await serverSupabaseClient(event);
  try {
    const { status } = await supabase.from("locations").insert([
      {
        user_id: user.id,
        latitude,
        longitude,
        name,
        tags,
      },
    ]);
    if (status === 201) {
      return { message: "Location inserted successfully" };
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message:
        error instanceof Error
          ? error?.message
          : "An unexpected error occurred.",
    });
  }
});
