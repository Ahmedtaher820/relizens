<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import { useReports } from "@/composables/useReports";
import { usePagination } from "@/composables/usePagination";
import { useReportStore } from "@/stores/reports";
import getStatusColor from "@/utilities/getStatusColor";
import type { Report } from "@/interfaces/reports";

/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
const emit = defineEmits(["displayReport"]);

//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const { filteredReports, paginatedReports, sortBy , sortDir } = useReports();
const { currentPage, itemsPerPage, setPage } = usePagination();
const { reports } = storeToRefs(useReportStore());
const status = ref(["pending", "completed", "rejected"]);
const hydrated = ref(false);

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
onMounted(() => {
  // Delay rendering until hydration from storage is done
  setTimeout(() => {
    hydrated.value = true;
  }, 0);
});
//#endregion

/***************************************
 **** Section Functions Declaration ****
 **************************************/
//#region Functions

function viewReports(report: Report): void {
  emit("displayReport", report);
}

function getTypeColor(type: string) {
  return {
    bug: "bg-red-100 text-red-600 px-2 py-1 rounded-xl",
    feature: "bg-green-100  text-green-600 px-2 py-1 rounded-xl my-2",
  }[type];
}

function changeStatus(report: Report, status: string) {
  reports.value = reports.value.map((item: Report) => {
    item.status = item.id === report.id ? status : item.status;
    return item;
  });
  toast.success(`Status of ${report.title} is Changed`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
  });
}

function toggleSort(field: keyof Report) {
  if (sortBy.value === field) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field;
    sortDir.value = "asc";
  }
}
//#endregion
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-base-300 shadow-sm">
    <table class="table table-zebra w-full">
      <thead class="bg-base-200 text-base-content">
        <tr>
          <th @click="toggleSort('title')" class="cursor-pointer">
            <span v-if="sortBy === 'title' && sortDir === 'asc'">▲</span>
            <span v-else-if="sortBy === 'title' && sortDir === 'desc'">▼</span>
            Title
          </th>
          <th>Type</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="paginatedReports.length">
          <tr v-for="report in paginatedReports" :key="report.id">
            <td>{{ report.title }}</td>

            <!-- Type -->
            <td class="capitalize w-24">
              <div class="flex items-center gap-1">
                <span>{{ report.type }}</span>
                <Bug v-if="report.type === 'bug'" class="w-4 h-4 text-error" />
                <BadgeCheck v-else class="w-4 h-4 text-success" />
              </div>
            </td>

            <!-- Status Dropdown -->
            <td class="capitalize ">
              <div class="dropdown">
                <div
                  v-if="hydrated"
                  tabindex="0"
                  role="button"
                  class="w-24 btn btn-sm btn-outline mr-auto"
                  :class="getStatusColor(report.status)"
                >
                  <p>{{ report.status }}</p>
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-[50]"
                >
                  <li
                    v-for="itemStatus in status"
                    :key="itemStatus"
                    @click="changeStatus(report, itemStatus)"
                    :class="[
                      itemStatus === report.status
                        ? 'pointer-events-none opacity-50'
                        : '',
                    ]"
                  >
                    <a>{{ itemStatus }}</a>
                  </li>
                </ul>
              </div>
            </td>

            <!-- Created At -->
            <td>{{ report.createdAt }}</td>

            <!-- Description -->
            <td class="max-w-sm truncate" :title="report.description">
              {{ report.description }}
            </td>

            <!-- Actions -->
            <td>
              <button
                class="btn btn-outline btn-sm"
                @click="viewReports(report)"
              >
                View
              </button>
            </td>
          </tr>
        </template>

        <template v-else>
          <tr>
            <td colspan="6" class="text-center text-gray-500 py-6">
              No data available.
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->

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
        v-for="i in Math.ceil(filteredReports.length / itemsPerPage)"
        :key="i"
        class="join-item btn btn-sm"
        :class="{ 'btn-active': i === currentPage }"
        @click="setPage(i)"
      >
        {{ i }}
      </button>

      <button
        class="join-item btn btn-sm"
        :disabled="
          currentPage === Math.ceil(filteredReports.length / itemsPerPage)
        "
        @click="setPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
