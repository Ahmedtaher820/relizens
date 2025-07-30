<script setup lang="ts">
import { ref } from "vue";
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
const isAdmin = true;
const showModal = ref(false);
const editingUser = ref(null);

//#region Variables
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
function openAddModal() {
  editingUser.value = null;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function editUser(user: any) {
  editingUser.value = user;
  showModal.value = true;
}
//#endregion
</script>

<template>
  <div>
    <div class="flex justify-between md:flex-row flex-col gap-4 mb-6">
      <UsersUserFilters />
      <button class="btn primary-btn " v-if="isAdmin" @click="openAddModal">
        + Add User
      </button>
    </div>
    <UsersUserTable @editUser="editUser" />
    <UsersUserForm
      v-model:isOpen="showModal"
      :editUser="editingUser"
      @close="closeModal"
    />
  </div>
</template>
<style></style>
