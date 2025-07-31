import { serverSupabaseUser } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "You must be logged in to access this resource.",
    });
  }

  event.context.user = user;
});
