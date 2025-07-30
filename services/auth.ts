import useApi from "@/composables/UseApi.js"
import type {LoginPayload} from "@/interfaces/auth"
export default function useFavoriteService() {
  /***************************************
   **** Section Variables Declaration ****
   **************************************/
  //#region Variables
  const { API } = useApi()
  const contextPath: string = ''


  //#endregion

  /***************************************
   **** Section Functions Declaration ****
   **************************************/
  //#region Functions
  function login(payload:LoginPayload): Promise<any> {
    return API(`${contextPath}/user/authentication/login`,  { method: 'POST', body: payload })
  }
  function getServices(){
    return API(`${contextPath}/assessment/general/home`)
    
  }
  //#endregion

  return {
    login,
    getServices
  }
}
