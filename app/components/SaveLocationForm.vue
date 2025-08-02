<script lang="ts" setup>
import * as z from "zod";

const { coords } = defineProps<{
  coords: { latitude: number; longitude: number };
}>();

const emit = defineEmits(["uploadSuccessful"]);

const awaitingFormSubmit = ref(false);

const { addLocation } = useLocations();

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),
});

export type TAddLocationSchema = z.output<typeof schema>;
const state = reactive<TAddLocationSchema>({
  name: "",
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
  awaitingFormSubmit.value = true;
  await addLocation({
    name: state.name,
    tags: state.tags,
    latitude: coords.latitude,
    longitude: coords.longitude,
    imageSrc: imageSrc.value,
  });
  //TODO: emit conditionally based on success or failure
  awaitingFormSubmit.value = false;
  emit("uploadSuccessful");
};
</script>

<template>
  <UForm class="flex flex-col gap-4" :state :schema @submit="handleFormSubmit">
    <UFormField size="xl" label="Name">
      <UInput
        v-model="state.name"
        type="text"
        placeholder="Enter a name"
        class="w-full"
      />
    </UFormField>
    <UFormField size="xl" label="Take a photo">
      <UInput
        class="w-full"
        size="xl"
        id="cameraFileInput"
        type="file"
        accept="image/*"
        capture="environment"
        @change="setImage"
      />
      <NuxtImg :src="imageSrc" />
    </UFormField>

    <UFormField size="xl" label="Tags">
      <UInputTags class="w-full" v-model="state.tags" :max-length="10" />
    </UFormField>

    <UButton
      type="submit"
      class="w-full mt-4"
      size="xl"
      label="Save Location"
      :loading="awaitingFormSubmit"
    />
  </UForm>
</template>
