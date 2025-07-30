import { defineStore } from "pinia";
import { ref } from "vue";
import type { Report } from "@/interfaces/reports";
export const useReportStore = defineStore(
  "reportStore",
  () => {
    /***************************************
     **** Section State Declaration ****
     **************************************/
    //#region State
    const reports = ref<Report[]>([
      {
        id: 101,
        title: "Login bug",
        type: "bug",
        status: "pending",
        createdAt: "2025-07-01",
        description: "User can log in with invalid email.",
      },
      {
        id: 102,
        title: "UI glitch on dashboard",
        type: "bug",
        status: "completed",
        createdAt: "2025-07-03",
        description: "Dashboard widgets overlap on smaller screens.",
      },
      {
        id: 103,
        title: "Add dark mode",
        type: "feature",
        status: "pending",
        createdAt: "2025-07-04",
        description: "Implement dark mode toggle for better accessibility.",
      },
      {
        id: 104,
        title: "Payment gateway timeout",
        type: "bug",
        status: "rejected",
        createdAt: "2025-07-06",
        description: "Transactions fail intermittently due to timeout errors.",
      },
      {
        id: 105,
        title: "Weekly email reports",
        type: "feature",
        status: "pending",
        createdAt: "2025-07-07",
        description: "Send summary reports to users every Monday morning.",
      },
      {
        id: 106,
        title: "Broken link in footer",
        type: "bug",
        status: "completed",
        createdAt: "2025-07-08",
        description: "The 'Privacy Policy' link leads to a 404 page.",
      },
    ]);
    const search = ref<string>("");
    const typeFilter = ref<string>("all");
    const statusFilter = ref<string>("all");
    //#endregion

    /***************************************
     **** Section Computed Getters ******
     **************************************/
    //#region Getter
    //#endregion

    /***************************************
     **** Section Functions Declaration (Actions) ****
     **************************************/
    //#region Actions

    //#endregion
    return {
      reports,
      search,
      typeFilter,
      statusFilter
    };
  },
  {
    persist: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      pick: ["reports"],
    },
  }
);
