<script setup lang="ts">
import { ref } from "vue";
import {useUserStore} from "@/stores/auth"
import { storeToRefs } from "pinia";
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const {currentUser} = storeToRefs(useUserStore())
const profile = ref({
  id: 10,
  fullName: currentUser.value.fullName,
  email: currentUser.value.email,
  role: currentUser.value.role,
  status: currentUser.value.status,
  createdAt: currentUser.value.createdAt,
});

// Local state for edit mode
const isEditing = ref(false);

// Editable copy of profile for the form
const editableProfile = ref({ ...profile.value });

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

function cancelEdit() {
  editableProfile.value = currentUser.value; // reset edits
  isEditing.value = false;
}


function saveEdit() {
  profile.value = { ...editableProfile.value };
  currentUser.value = profile.value
  isEditing.value = false;
}

//#endregion
</script>


<template>
  <div class="mx-auto p-6 bg-base-100 rounded-lg shadow-md dark:bg-base-200">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Profile Details</h1>
      <button
        class="btn btn-sm"
        @click="isEditing = !isEditing"
      >
        {{ isEditing ? "Cancel" : "Update" }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Full Name -->
      <div>
        <label class="block text-sm font-medium mb-1">Full Name</label>
        <template v-if="isEditing">
          <input
            v-model="editableProfile.fullName"
            type="text"
            placeholder="Full Name"
            class="input input-bordered w-full"
          />
        </template>
        <template v-else>
          <p class="py-2">{{ profile.fullName }}</p>
        </template>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <template v-if="isEditing">
          <input
            v-model="editableProfile.email"
            type="email"
            placeholder="Email"
            class="input input-bordered w-full"
          />
        </template>
        <template v-else>
          <p class="py-2">{{ profile.email }}</p>
        </template>
      </div>

      <!-- Role -->
      <div>
        <label class="block text-sm font-medium mb-1">Role</label>
        <template v-if="isEditing">
          <select
            v-model="editableProfile.role"
            disabled
            class="select select-bordered w-full cursor-not-allowed"
          >
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>
        </template>
        <template v-else>
          <p class="capitalize py-2">{{ profile.role }}</p>
        </template>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium mb-1">Status</label>
        <template v-if="isEditing">
          <select
            v-model="editableProfile.status"
            class="select select-bordered w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </template>
        <template v-else>
          <p class="capitalize py-2">{{ profile.status }}</p>
        </template>
      </div>

      <!-- Created At -->
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium mb-1">Account Created At</label>
        <p class="py-2">{{ profile.createdAt }}</p>
      </div>
    </div>

    <div v-if="isEditing" class="mt-6 flex space-x-4">
      <button
        class="btn btn-success"
        @click="saveEdit"
      >
        Save
      </button>
      <button
        class="btn btn-error"
        @click="cancelEdit"
      >
        Cancel
      </button>
    </div>
  </div>
</template>