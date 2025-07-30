  
  <script setup lang="ts">
  import { useReports } from '@/composables/useReports'
  import {useReportStore} from "@/stores/reports"

import { storeToRefs } from 'pinia'
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
 const {  clearFilters } = useReports()
 const {search , statusFilter,typeFilter} = storeToRefs(useReportStore())
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
      placeholder="Search by title"
      class="input input-bordered w-full sm:w-64"
    />

    <!-- Type Filter -->
    <select v-model="typeFilter" class="select select-bordered flex-1/3  md:flex-1 md:w-40">
      <option disabled value="all">Filter by Type</option>
      <option value="all">All</option>
      <option value="bug">Bug</option>
      <option value="feature">Feature</option>
    </select>

    <!-- Status Filter -->
    <select v-model="statusFilter" class="select select-bordered w-40 flex-1/3  md:flex-1 md:w-40">
      <option disabled value="all">Filter by Status</option>
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
      <option value="rejected">Rejected</option>
    </select>

    <!-- Clear Button -->
    <button class="btn btn-outline flex-1/2  md:flex-1" @click="clearFilters">Clear Filters</button>
  </div>
</template>