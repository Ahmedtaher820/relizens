<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "nuxt/app";
import { useUserStore } from "@/stores/auth";
import { useRoute } from "vue-router";

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
const { logout } = useUserStore();
const route = useRoute();
const isDark = ref<boolean>(false);
const showSideBar = defineModel<boolean>("showSideBar", {
  default: false,
});
const items = ref<Record<string, any>>([
  { name: "Profile", link: "/profile" },
  { name: "Logout", link: "" },
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

if (process.client) {
  isDark.value = localStorage.theme === "dark";
  document.documentElement.setAttribute(
    "data-theme",
    isDark.value ? "dark" : "light"
  );
}

function handleItemClick(item: { name: string; link: string }) {
  item.name === "Logout" ? logout() :  navigateTo(item.link || "/");
}

/**
 * @description toggle current theme
 */

function toggleTheme(): void {
  isDark.value = !isDark.value;
  const html = document.documentElement as HTMLElement;
  if (isDark.value) {
    html.setAttribute("data-theme", "dark");
    localStorage.theme = "dark";
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.theme = "light";
  }
}

function openSidebar() {
  showSideBar.value = true
}
//#endregion
</script>

<template>
  <div
    class="py-3 px-6 bg-base-200 dark:bg-base-800 dark:text-black flex justify-between items-center"
  >
    <!-- Sidebar Trigger placeholder (replace with your own) -->
    <button class="btn btn-ghost btn-square flex justify-center md:hidden " @click="openSidebar">
      <!-- Example Hamburger icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <h1 class="text-2xl font-bold capitalize">{{ route.name }}</h1>

    <div class="flex items-center gap-4">
      <!-- Dark mode toggle -->
      <button
        @click="toggleTheme"
        class="btn btn-square btn-outline"
        :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        title="Toggle Dark Mode"
      >
        <span v-if="isDark">☀️</span>
        <span v-else>🌙</span>
      </button>

      <!-- User dropdown -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              src="https://avatars.githubusercontent.com/u/62017400?s=32&v=1"
              alt="user avatar"
            />
          </div>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 dark:bg-base-900 rounded-box w-52"
        >
          <li class="menu-title">
            <span>My Account</span>
          </li>
          <li v-for="(item, idx) in items" :key="idx">
            <a
              @click.prevent="handleItemClick(item)"
              :class="item.name === 'Logout' ? 'text-error' : ''"
              href="#"
              >{{ item.name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
