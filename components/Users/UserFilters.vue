<script setup lang="ts">
import { useUsers } from "@/composables/useUsers";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/auth";
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
const { clearFilters } = useUsers();
const { roleFilter, statusFilter, search } = storeToRefs(useUserStore());
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

//#endregion
</script>
    <template>
  <div class="flex flex-wrap gap-4 items-center">
    <!-- Search Input -->
    <input
      v-model="search"
      type="text"
      placeholder="Search by name or email"
      class="input input-bordered w-full sm:w-64"
    />

    <!-- Role Filter -->
    <select
      v-model="roleFilter"
      class="select select-bordered flex-1/3 md:flex-1 md:w-40"
    >
      <option value="all" selected>All Roles</option>
      <option value="admin">Admin</option>
      <option value="client">Client</option>
    </select>

    <!-- Status Filter -->
    <select
      v-model="statusFilter"
      class="select select-bordered flex-1/3  md:flex-1 md:w-40"
    >
      <option value="all" selected>All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
    <button class="btn primary-btn flex-1/2  md:flex-1 md:text-base text-sm" @click="clearFilters">Clear Filter</button>
  </div>
</template>