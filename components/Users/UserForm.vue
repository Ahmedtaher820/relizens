<script setup lang="ts">
import { ref, watch, computed, PropType } from "vue";
import { storeToRefs } from "pinia";
import { toast } from 'vue3-toastify';
import { useUserStore } from "@/stores/auth";
import { User } from "@/interfaces/auth"
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
const props = defineProps({
  editUser: Object as PropType<User>,
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
const isOpen = defineModel("isOpen", { default: false });
const form = ref({
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
const isEdit = computed(() => !!props.editUser);
const currentEditUserIsAdmin = computed(
  () => props.editUser?.role === "admin" && isEdit.value
);
//#endregion

/***************************************
 **** Section Watchers *****************
 **************************************/
//#region Watchers
watch(
  () => props.editUser,
  (user) => {
    if (user) {
      form.value = {
        id: user.id || null,
        fullName: user.fullName || "",
        email: user.email || "",
        role: user.role || "client",
        status: user.status || "active",
        createdAt: user.createdAt || new Date().toISOString().slice(0, 10),
      };
    } else {
      form.value = {
        id: null,
        fullName: "",
        email: "",
        role: "client",
        status: "active",
        createdAt: new Date().toISOString().slice(0, 10),
      };
    }
  },
  { immediate: true }
);
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
function handleSubmit() {
  if (isEdit.value) {
    const index = users.value.findIndex((u) => u.id === form.value.id);
    if (index !== -1) users.value[index] = { ...form.value };
  } else {
    const isExistUser = form.value.email && users.value.some((u) => u.email === form.value.email.trim());
    if (isExistUser) {
      toast.error('email is already exist', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } else {
      const newId = Math.max(...users.value.map((u) => u.id)) + 1;
      users.value.push({ ...form.value, id: newId });
      toast.success('user is created successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }

  emit("close");
}
//#endregion
</script>

<template>
  <dialog class="modal" :open="isOpen">
    <div class="modal-box w-full max-w-2xl">
      <!-- Modal Header -->
      <div class="flex justify-between items-start">
        <h3 class="font-bold text-lg">
          {{ isEdit ? `Update User ${form.fullName}` : "Add User" }}
        </h3>
        <form method="dialog">
          <button @click="emit('close')" class="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </form>
      </div>

      <!-- Admin warning -->
      <p class="text-red-600 text-sm mt-1" v-if="currentEditUserIsAdmin">
        You can't update admin role
      </p>

      <!-- Modal Form -->
      <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
        <!-- Full Name -->
        <div>
          <label class="label"><span class="label-text">Full Name</span></label>
          <input v-model="form.fullName" type="text" placeholder="Enter full name" :disabled="currentEditUserIsAdmin"
            required class="input input-bordered w-full" />
        </div>

        <!-- Email -->
        <div>
          <label class="label"><span class="label-text">Email</span></label>
          <input v-model="form.email" type="email" placeholder="Enter email" :disabled="currentEditUserIsAdmin" required
            class="input input-bordered w-full" />
        </div>

        <!-- Role & Status -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Role -->
          <div>
            <label class="label"><span class="label-text">Role</span></label>
            <select v-model="form.role" class="select select-bordered w-full" :disabled="currentEditUserIsAdmin"
              required>
              <option disabled value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label class="label"><span class="label-text">Status</span></label>
            <select v-model="form.status" class="select select-bordered w-full" :disabled="currentEditUserIsAdmin"
              required>
              <option disabled value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="modal-action mt-6">
          <button type="button" class="btn btn-outline" @click="emit('close')">Cancel</button>
          <button type="submit" class="btn btn-primary" :disabled="currentEditUserIsAdmin">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>
<style>
.role-select button {
  width: 100%;
}
</style>
