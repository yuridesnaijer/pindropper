<script lang="ts" setup>
import * as z from "zod";

const { coords } = defineProps<{
  coords: { latitude: number; longitude: number };
}>();

const emit = defineEmits(["uploadSuccessful"]);

const toast = useToast();

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),
});

type Schema = z.output<typeof schema>;
const state = reactive<Partial<Schema>>({
  name: undefined,
  tags: [],
});

const imageSrc = ref<string>("");

const setImage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc.value = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const handleFormSubmit = async () => {
  try {
    await $fetch("/api/locations", {
      method: "POST",
      body: {
        name: state.name,
        tags: state.tags,
        latitude: coords.latitude,
        longitude: coords.longitude,
        image: imageSrc.value,
      },
    });

    toast.add({
      title: "Success",
      description: "Your location has been saved successfully.",
      color: "success",
    });

    emit("uploadSuccessful");
  } catch (e) {
    toast.add({
      title: "Error",
      description: "There was an error saving your location." + e,
      color: "error",
    });
  }
};
</script>

<template>
  <UForm :state :schema @submit="handleFormSubmit">
    <label for="cameraFileInput">
      <UButton>
        <span>Open camera</span>
      </UButton>

      <UInput
        id="cameraFileInput"
        type="file"
        accept="image/*"
        capture="environment"
        @change="setImage"
      />
      <NuxtImg :src="imageSrc" />

      <UFormField label="name">
        <UInput v-model="state.name" type="text" placeholder="Enter a name" />
      </UFormField>

      <UFormField label="tags">
        <UInputTags v-model="state.tags" :max-length="10" />
      </UFormField>

      <UButton type="submit" label="Save Location" />
    </label>
  </UForm>
</template>
