import { serverSupabaseClient } from "#supabase/server";
import type { TLocation } from "~/composables/useLocations";

export default eventHandler(
  async (event): Promise<{ locations: TLocation[] } | null> => {
    const supabase = await serverSupabaseClient(event);

    try {
      const { data } = await supabase
        .from("locations")
        .select("*")
        .eq("user_id", event.context.user.id);

      return {
        locations: data
          ? data.map(
              (location) =>
                //TODO: generate supabase types for this table
                //@ts-expect-error
                ({ ...location, imageSrc: location.image_url }) as TLocation,
            )
          : [],
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
);
