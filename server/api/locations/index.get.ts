import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  try {
    const { data } = await supabase
      .from("locations")
      .select("*")
      .eq("user_id", event.context.user.id);
    return { locations: data };
  } catch (error) {
    return error;
  }
});
