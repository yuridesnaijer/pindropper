<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'

const { coords } = useGeolocation()
const imageSrc = ref<string>('')
const setImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageSrc.value = e.target?.result as string
    }
    reader.readAsDataURL(input.files[0])
  }
}
</script>

<template>
  <UContainer>
  <LMap
      style="height: 350px"
      :zoom="50"
      :center="[coords.latitude, coords.longitude]"
      :use-global-leaflet="false"
  >
    <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
    />
  </LMap>

  <UButton>Save</UButton>

    <label for="cameraFileInput">
      <span class="btn">Open camera</span>

      <!-- The hidden file `input` for opening the native camera -->
      <input
          id="cameraFileInput"
          type="file"
          accept="image/*"
          capture="environment"
          @change="setImage"
      />
    </label>

    <!-- displays the picture uploaded from the native camera -->
    <NuxtImg :src="imageSrc" />
  </UContainer>
</template>