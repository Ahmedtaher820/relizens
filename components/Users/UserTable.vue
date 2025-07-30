<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUsers } from "@/composables/useUsers";
import { usePagination } from "@/composables/usePagination";
import { useUserStore } from "@/stores/auth";
import { User } from "@/interfaces/auth";
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
const emit = defineEmits(["editUser"]);

//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const { filteredUsers, sortBy, sortDir, paginatedUsers, deleteUser } = useUsers();
const { currentPage, itemsPerPage, setPage } = usePagination();
const {  isAdmin } = storeToRefs(useUserStore());

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
function toggleSort(field: keyof User) {
  if (sortBy.value === field) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field;
    sortDir.value = "asc";
  }
}

function edit(user: User) {
  emit("editUser", user);
}

function remove(user: User): void {
  deleteUser(user);
}


//#endregion
</script>

<template>
  <div class="overflow-x-auto shadow-md rounded-lg border border-base-300">
    <table class="table table-zebra w-full">
      <thead class="bg-base-200 text-base-content">
        <tr>
          <th @click="toggleSort('fullName')" class="cursor-pointer">
            <span v-if="sortDir === 'asc'">▲</span>
            <span v-else-if="sortDir === 'desc'">▼</span> Name
          </th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
           <th @click="toggleSort('createdAt')" class="cursor-pointer">
            <span v-if="sortDir === 'asc'">▲</span>
            <span v-else-if="sortDir === 'desc'">▼</span> Created At
          </th>
          <th v-if="isAdmin">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="paginatedUsers.length">
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-base-100 transition duration-200"
          >
            <td class="font-medium">{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td class="capitalize">{{ user.role }}</td>
            <td>
              <span
                :class="[
                  'px-2 py-1 rounded-full text-sm font-semibold',
                  user.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{ user.status }}
              </span>
            </td>
            <td>{{ user.createdAt }}</td>
            <td v-if="isAdmin">
              <div class="flex gap-2">
                <button class="btn btn-sm btn-outline" @click="edit(user)">Edit</button>
                <button class="btn btn-sm btn-error text-white" @click="remove(user)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="6" class="text-center py-6 text-gray-500">No data available.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="mt-6 flex justify-center">
    <div class="join">
      <button
        class="join-item btn btn-sm"
        :disabled="currentPage === 1"
        @click="setPage(currentPage - 1)"
      >
        Prev
      </button>

      <button
        v-for="i in Math.ceil(filteredUsers.length / itemsPerPage)"
        :key="i"
        class="join-item btn btn-sm"
        :class="{ 'btn-active': i === currentPage }"
        @click="setPage(i)"
      >
        {{ i }}
      </button>

      <button
        class="join-item btn btn-sm"
        :disabled="currentPage === Math.ceil(filteredUsers.length / itemsPerPage)"
        @click="setPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
