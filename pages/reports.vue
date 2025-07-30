<script setup lang="ts">
import {ref} from "vue"
import type { Report } from '@/interfaces/reports'

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
const isAdmin = true
const showModal = ref(false)
const reportData = ref<Report>(null)

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


function closeModal() {
    showModal.value = false
}
function displayReport(report: Report) {
    reportData.value = report
    showModal.value = true
}
//#endregion
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <ReportsReportFilters />
        </div>
        <ReportsReportTable @displayReport="displayReport" />
        <ReportsReportView v-model:isOpen="showModal" :reportData="reportData" @close="closeModal" />
    </div>
</template>
<style></style>