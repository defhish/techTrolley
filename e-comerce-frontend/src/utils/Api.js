import { config } from "./config";
import { getToken } from "./localstorage";

const handleResponse = async (res) => {
  try {
    const data = await res.json(); // ✅ Correct way to parse JSON
    return { statusCode: res.status, data };
  } catch (e) {
    console.error("❌ Failed to parse JSON:", e);
    const raw = await res.text();
    console.warn("📦 Raw response (not JSON):", raw);
    return { statusCode: res.status, data: [] }; // fallback
  }
};

const getRequest = async (path) => {
  try {
    const params = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
    const res = await fetch(config.baseURL + path, params);
    return await handleResponse(res);
  } catch (e) {
    console.error(`❌ Error in GET ${path}:`, e);
    return { statusCode: 400, data: [] };
  }
};

const postRequest = async (path, body) => {
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    return await handleResponse(res);
  } catch (e) {
    console.error(`❌ Error in POST ${path}:`, e);
    return { statusCode: 400, data: [] };
  }
};

const DeleteRequest = async (path) => {
  try {
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const res = await fetch(config.baseURL + path, params);
    return await handleResponse(res);
  } catch (e) {
    console.error(`❌ Error in DELETE ${path}:`, e);
    return { statusCode: 400, data: [] };
  }
};

const putRequest = async (path, body) => {
  try {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    return await handleResponse(res);
  } catch (e) {
    console.error(`❌ Error in PUT ${path}:`, e);
    return { statusCode: 400, data: [] };
  }
};

export const Api = {
  getRequest,
  postRequest,
  DeleteRequest,
  putRequest,
};
