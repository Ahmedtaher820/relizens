<script setup lang="ts">
import { ref, PropType, reactive } from "vue";
import { useUserStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import getStatusColor from "@/utilities/getStatusColor";
import { Report } from "@/interfaces/reports";
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
const props = defineProps({
  reportData: Object as PropType<Report>,
});

//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
const emit = defineEmits(["close"]);

//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables

const { users } = storeToRefs(useUserStore());
const isOpen = defineModel<boolean>("isOpen", { default: false });
const form = reactive<Record<string , any>>({
  id: null,
  fullName: "",
  email: "",
  role: "client",
  status: "active",
  createdAt: new Date().toISOString().slice(0, 10),
});
//#endregion

/***************************************
 **** Section Computed Variables  ******
 **************************************/
//#region Computed
//#endregion

/***************************************
 **** Section Watchers *****************
 **************************************/
//#region Watchers
//#endregion

/***************************************
 **** Section Lifecycle Hooks  *********
 **************************************/
//#region Lifecycle Hooks
//#endregion

/***************************************
 **** Section Functions Declaration ****
 **************************************/
//#region Functions
function closeDialog(){
  emit("close");
}
//#endregion
</script>

<template>
  <dialog v-if="isOpen" @close="closeDialog" class="modal modal-open">
    <div class="modal-box w-full max-w-2xl">
      <!-- Header -->
      <div class="modal-header flex justify-between items-center mb-4">
        <h3 class="font-bold text-lg">
          Report <strong>{{ reportData.title }}</strong> Details
        </h3>
      </div>

      <!-- Responsive Grid of Fields -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Title -->
        <div>
          <label class="label">
            <span class="label-text font-medium">Title</span>
          </label>
          <input
            type="text"
            :value="reportData.title"
            disabled
            class="input input-bordered input-sm w-full bg-base-200"
          />
        </div>

        <!-- Type -->
        <div>
          <label class="label">
            <span class="label-text font-medium">Type</span>
          </label>
          <input
            type="text"
            :value="reportData.type"
            disabled
            class="input input-bordered input-sm w-full bg-base-200"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="label">
            <span class="label-text font-medium">Status</span>
          </label>
          <input
            type="text"
            :value="reportData.status"
            disabled
            :class="['input input-bordered input-sm w-full', getStatusColor(reportData.status)]"
          />
        </div>

        <!-- Created At -->
        <div>
          <label class="label">
            <span class="label-text font-medium">Created At</span>
          </label>
          <input
            type="text"
            :value="reportData.createdAt"
            disabled
            class="input input-bordered input-sm w-full bg-base-200"
          />
        </div>

        <!-- Description -->
        <div class="sm:col-span-2">
          <label class="label">
            <span class="label-text font-medium">Description</span>
          </label>
          <textarea
            :value="reportData.description"
            disabled
            class="textarea textarea-bordered w-full bg-base-200 resize-none"
            rows="3"
          ></textarea>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-action mt-4">
        <form method="dialog">
          <button class="btn btn-sm" @click="closeDialog">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<style>
.role-select button {
  width: 100%;
}

</style>
