import { ref, computed, watch } from "vue";
import { usePagination } from "@/composables/usePagination";
import { useUserStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import type { User } from "@/interfaces/auth";
import type { ComputedRef } from "vue";

export function useUsers() {
  /***************************************
   **** Section Variables Declaration ****
   **************************************/
  //#region Variables
  const { currentPage, itemsPerPage } = usePagination();
  const { users, roleFilter, statusFilter, search } = storeToRefs(
    useUserStore()
  );
  const sortBy = ref<keyof User | null>("name");
  const sortDir = ref<"asc" | "desc">("asc");
  //#endregion

  /***************************************
   **** Section Computed Variables  ******
   **************************************/
  //#region Computed

const filteredUsers: ComputedRef<User[]> = computed(() => {
  const filtered = users.value.filter((u: User) => {
    return (
      (search.value === "" ||
        u.fullName.toLowerCase().includes(search.value.toLowerCase().trim()) ||
        u.email.toLowerCase().includes(search.value.toLowerCase().trim())) &&
      (roleFilter.value === "all" || u.role === roleFilter.value) &&
      (statusFilter.value === "all" || u.status === statusFilter.value)
    );
  });

  if (sortBy.value) {
    return [...filtered].sort((a, b) => {
      let aVal = a[sortBy.value!];
      let bVal = b[sortBy.value!];

      // Special case for date string comparison (e.g. createdAt)
      if (sortBy.value === "createdAt") {
        aVal = new Date(aVal as string);
        bVal = new Date(bVal as string);
        return sortDir.value === "asc"
          ? (aVal as Date).getTime() - (bVal as Date).getTime()
          : (bVal as Date).getTime() - (aVal as Date).getTime();
      }

      // Generic string comparison (like fullName)
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir.value === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });
  }

  return filtered;
});


  const paginatedUsers: ComputedRef<User[]> = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;

    return filteredUsers.value.slice(start, end);
  });
  //#endregion

  /***************************************
   **** Section Watchers *****************
   **************************************/
  //#region Watchers
  watch(
    [search, roleFilter, statusFilter],
    ([newSearch, newRole, newStatus]) => {
      currentPage.value = 1;
    }
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
  function clearFilters() {
    search.value = "";
    roleFilter.value = "all";
    statusFilter.value = "all";
    sortBy.value = "date";
    sortDir.value = "desc";
  }

  function deleteUser(user: User) {
    const confirmed = confirm(
      `Are you sure you want to delete ${user.fullName}?`
    );
    if (confirmed) {
      const index: number = users.value.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        users.value.splice(index, 1);
      }
    }
  }
  //#endregion

  return {
    filteredUsers,
    paginatedUsers,
    search,
    roleFilter,
    statusFilter,
    sortBy,
    sortDir,
    clearFilters,
    deleteUser,
  };
}
