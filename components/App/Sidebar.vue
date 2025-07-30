<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "nuxt/app";
import { Home, User, ClipboardList } from "lucide-vue-next";
import type { Component } from "vue";

interface Items {
  title: string;
  url: string;
  icon: Component;
}
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
const emits = defineEmits(["close"]);
//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const items = ref<Items[]>([
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Users", url: "/users", icon: User },
  { title: "Reports", url: "/reports", icon: ClipboardList },
]);
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
function navigateToPage(path: string): void {
  navigateTo(path);
  emits("close");
}

function closeSideBar():void {
  emits('close')
}
//#endregion
</script>

<template>
  <aside
    class="bg-base-200 min-h-screen w-full max-w-[16rem] shadow-lg lg:block"
  >
    <svg
      class="absolute top-[5px] right-[10px] cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 24 24"
      @click="closeSideBar"
    >
      <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
      <path
        fill="#ff0000ad"
        d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"
      />
    </svg>
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-4 text-base-content">Rezliens</h2>
      <ul class="menu space-y-2 w-full">
        <li v-for="item in items" :key="item.url">
          <NuxtLink
            :to="item.url"
            class="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200"
            active-class="bg-primary text-primary-content"
            @click="navigateToPage(item.url)"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">{{ item.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
/* Optional styling */
</style>
