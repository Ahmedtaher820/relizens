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
//#region Variables

const sidebarOpen = ref(false);
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
function closeSideBar():void{
  sidebarOpen.value = false
}
//#endregion
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar (Desktop) -->
    <AppSidebar class="hidden md:block"  />
    <!-- Mobile Sidebar -->
    <transition name="sidebar-fade">
      <div v-if="sidebarOpen" class="fixed inset-0 z-40 lg:hidden">
        <div
          class="absolute inset-0 bg-black opacity-50"
          @click="closeSideBar"
        ></div>

        <transition name="slide-in">
          <div class="relative w-64 bg-base-200 h-full">
            <AppSidebar
            @close="closeSideBar"
            />
          </div>
        </transition>
      </div>
    </transition>

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Navbar -->
      <AppNavbar v-model:showSideBar="sidebarOpen" />

      <!-- Page Content -->
      <main class="p-4 overflow-y-auto flex-1 bg-base-100 overflow-x-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Background fade transition */
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.3s ease;
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}
.sidebar-fade-enter-to,
.sidebar-fade-leave-from {
  opacity: 1;
}

/* Sidebar slide-in transition */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease;
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-100%);
}
.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0);
}

</style>
