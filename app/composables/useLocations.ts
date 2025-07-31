export type TLocation = {
  id: string;
  name: string;
  tags: string[];
  imageSrc: string;
  latitude: number;
  longitude: number;
};
export default function useLocations() {
  const toast = useToast();
  const locations = useState<TLocation[]>("locations", () => shallowRef([]));

  const fetchLocations = async () => {
    try {
      const data = await $fetch("/api/locations");
      locations.value = data ? data.locations : [];
    } catch (e) {
      toast.add({
        title: "Error",
        description: "There was an error fetching locations." + e,
        color: "error",
      });
    }
  };

  const addLocation = async (location: Omit<TLocation, "id">) => {
    try {
      const res = await $fetch("/api/locations", {
        method: "POST",
        body: {
          name: location.name,
          tags: location.tags,
          latitude: location.latitude,
          longitude: location.longitude,
          image: location.imageSrc,
        },
      });

      toast.add({
        title: "Success",
        description: "Your location has been saved successfully.",
        color: "success",
      });

      await fetchLocations();
      return res;
    } catch (e) {
      toast.add({
        title: "Error",
        description: "There was an error saving your location." + e,
        color: "error",
      });

      return e;
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      await $fetch("api/locations/", {
        method: "DELETE",
        body: { id },
      });

      toast.add({
        title: "Success",
        description: "Location deleted successfully.",
        color: "success",
      });

      await fetchLocations();
    } catch (e) {
      toast.add({
        title: "Error",
        description: "There was an error deleting the location." + e,
        color: "error",
      });
    }
  };

  return {
    locations,
    fetchLocations,
    addLocation,
    deleteLocation,
  };
}
