import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "You must be logged in to access this resource.",
    });
  }

  const supabase = await serverSupabaseClient(event);
  try {
    const { data } = await supabase
      .from("locations")
      .select("*")
      .eq("user_id", user.id);
    return { locations: data };
  } catch (error) {
    return error;
  }
});
