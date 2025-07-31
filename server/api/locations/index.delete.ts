import { serverSupabaseClient } from "#supabase/server";
import * as z from "zod";

const bodySchema = z.object({
  id: z.number(),
});

export default eventHandler(async (event) => {
  const { id } = await readValidatedBody(event, bodySchema.parse);

  const supabase = await serverSupabaseClient(event);
  //TODO: delete image from cloudinary
  try {
    const { status } = await supabase.from("locations").delete().eq("id", id);

    if (status === 204) {
      return { message: "Location deleted successfully" };
    }
  } catch (error) {
    return error;
  }
});
