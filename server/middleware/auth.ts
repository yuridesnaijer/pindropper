import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    event.context.user = await serverSupabaseUser(event);
  } catch (error) {
    console.error("Auth error: ", error);
  }
});
