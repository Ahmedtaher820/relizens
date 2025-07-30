import { ref, computed, watch } from "vue";
import { usePagination } from "@/composables/usePagination";
import { useReportStore } from "@/stores/reports";
import { storeToRefs } from "pinia";
import type { Report } from "@/interfaces/reports";
import type { ComputedRef } from "vue";
export function useReports() {
  /***************************************
   **** Section Variables Declaration ****
   **************************************/
  //#region Variables
  const { currentPage, itemsPerPage } = usePagination();
  const { reports, search, statusFilter, typeFilter } = storeToRefs(
    useReportStore()
  );
  const sortBy = ref<keyof Report | null>("date"); // default sort by "date" (or null for no sorting)
  const sortDir = ref<"asc" | "desc">("asc");
  //#endregion

  /***************************************
   **** Section Computed Variables  ******
   **************************************/
  //#region Computed
  const filteredReports: ComputedRef<Report[]> = computed(() => {
    const filtered = reports.value.filter((u: Report) => {
      return (
        (search.value === "" ||
          u.title.toLowerCase().includes(search.value.toLowerCase().trim())) &&
        (typeFilter.value === "all" || u.type === typeFilter.value) &&
        (statusFilter.value === "all" || u.status === statusFilter.value)
      );
    });

    if (sortBy.value) {
      return [...filtered].sort((a, b) => {
        const aVal = a[sortBy.value!];
        const bVal = b[sortBy.value!];

        // String comparison
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDir.value === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        // Date or number comparison
        if (
          (typeof aVal === "number" && typeof bVal === "number") ||
          (aVal instanceof Date && bVal instanceof Date)
        ) {
          return sortDir.value === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
    }

    return filtered;
  });

  const paginatedReports: ComputedRef<Report[]> = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;

    return filteredReports.value.slice(start, end);
  });
  //#endregion

  /***************************************
   **** Section Watchers *****************
   **************************************/
  //#region Watchers
  watch(
    [search, typeFilter, statusFilter],
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
    typeFilter.value = "all";
    statusFilter.value = "all";
  }
  //#endregion

  return {
    filteredReports,
    paginatedReports,
    search,
    typeFilter,
    statusFilter,
    sortBy,
    sortDir,
    clearFilters,
  };
}
