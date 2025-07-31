import { serverSupabaseClient } from "#supabase/server";
import cloudinary from "cloudinary";
import * as z from "zod";

const bodySchema = z.object({
  name: z.string(),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
  latitude: z.number(),
  longitude: z.number(),
  image: z.string().optional(),
});

export default eventHandler(async (event) => {
  const { name, tags, longitude, latitude, image } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  const cloudinaryResult = image
    ? await cloudinary.v2.uploader.upload(image)
    : undefined;

  const supabase = await serverSupabaseClient(event);

  try {
    const { status } = await supabase.from("locations").insert([
      {
        user_id: event.context.user.id,
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
