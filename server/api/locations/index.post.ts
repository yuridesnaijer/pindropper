import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import cloudinary from "cloudinary";
import * as z from "zod";

const bodySchema = z.object({
  name: z.string(),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
  latitude: z.number(),
  longitude: z.number(),
  image: z.string(),
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

  const { name, tags, longitude, latitude, image } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  const cloudinaryResult = await cloudinary.v2.uploader.upload(image);
  console.log("cloudinaryResult", cloudinaryResult);
  const supabase = await serverSupabaseClient(event);

  try {
    const { status } = await supabase.from("locations").insert([
      {
        user_id: user.id,
        latitude,
        longitude,
        name,
        tags,
        image_url: cloudinaryResult?.secure_url,
      },
    ]);
    if (status === 201) {
      return { message: "Location inserted successfully" };
    }
  } catch (error) {
    return error;
  }
});
