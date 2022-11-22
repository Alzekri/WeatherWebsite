<template>
  <div class="d-flex text-center" style="height: 20vh">
    <div class="m-auto">
      <h4>Clicked Position</h4>
      <span v-if="otherPos">
        Latitude: {{ otherPos.lat.toFixed(2) }}, Longitude:
        {{ otherPos.lng.toFixed(2) }}
      </span>
      <span v-else>Click the map to select a position</span>
    </div>
  </div>
  <div
    class="row text-center"
    @click="
      (this.$store.state.latt = otherPos.lat.toFixed(2)),
        (this.$store.state.lann = otherPos.lng.toFixed(2)),
        pushed()
    "
  >
    <div class="btn btn-dark w-10">Click here to view data</div>
  </div>
  <div ref="mapDiv" style="width: 100%; height: 80vh"></div>
</template>

<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted } from "vue";
import { useGeolocation } from "../useGeolocation.js";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "AIzaSyBOSZuqGTKA0ZCfmhbR_OyVEmVdceK3Qh4";

export default {
  methods: {
    pushed() {
      this.$router.push({ path: "/view" });
    },
  },

  setup() {
    const { coords } = useGeolocation();
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));
    const otherPos = ref(null);

    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    let map = ref(null);
    onMounted(async () => {
      await loader.load();
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 7,
      });
      clickListener = map.value.addListener(
        "click",
        ({ latLng: { lat, lng } }) =>
          (otherPos.value = { lat: lat(), lng: lng() })
      );
    });

    return { currPos, otherPos, mapDiv };
  },
};
</script>

