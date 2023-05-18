import { PaginationParams, option, results } from "../types/common";
import { Form } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/"

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export const request = async (endpoint: string, method: RequestMethod = 'GET', data: any = {}) => {
    let url;
    let payload: string;

    if (method==="GET") {
        const requestParams = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}` : ""
        url = `${API_BASE_URL}${endpoint}${requestParams}`
        payload = ""
    }else{
      url = `${API_BASE_URL}${endpoint}`
      payload = data ? JSON.stringify(data) : ""
    }

    // const auth = "Basic " + window.btoa("yogesh:Test@2002");

    const token = localStorage.getItem("token")
    const auth = token ? "Token "+token : ""

      const response = await fetch(
        url, 
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: method!=="GET" && method!=="DELETE" ? payload: null,
      });

      if (method==="DELETE"){
        return "success"
      }

      if (response.ok){
        const json = await response.json();
        return json;
      }else {
        const errorJson = await response.json();
        throw Error(errorJson);
      }
}

export const createForm = (form : Form) => {
  return request('forms/', 'POST', form)
}

export const login = (username: string, password: string) => {
  return request('auth-token/', 'POST', {username, password})
}

export const me = () => {
  return request('users/me/', 'GET', {})
}

export const listForms = (pageParams: PaginationParams) => {
  return request('forms/', 'GET', pageParams)
}

export const deleteListedForm = (id: number) => {
  return request(`forms/${id}/`, 'DELETE')
}

export const getFormData = (id: number) => {
  return request(`forms/${id}/fields/`, "GET")
}

export const getForm = (id: number) => {
  return request(`forms/${id}/`, 'GET')
}

export const updateForm = (id: number, payload: {title: string, description?: string, is_public?: boolean}) => {
  return request(`forms/${id}/`, 'PATCH', payload)
}

export const deleteParticularField = (form_pk: number, id: number) => {
  return request(`forms/${form_pk}/fields/${id}/`, 'DELETE')
}

export const postFormFields = (form_pk :number, payload: results) => {
  return request(`forms/${form_pk}/fields/`, 'POST', payload)
}

export const addOptions = (form_pk: number, id: number, payload: { options: option[]; }|{ label: string; }) => {
  return request(`forms/${form_pk}/fields/${id}/`, 'PATCH', payload)
}

export const uploadAnswer = (form_pk: number, payload:{answers: {form_field: number, value: string}[]}) => {
  return request(`forms/${form_pk}/submission/`, 'POST', payload)
}