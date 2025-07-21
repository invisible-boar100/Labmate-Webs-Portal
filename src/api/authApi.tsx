import axios from 'axios';

const API_BASE_URL =
  'https://medease-akfrf8c3gpagg4gx.southafricanorth-01.azurewebsites.net/api';

const api = axios.create({
  baseURL: API_BASE_URL, // Now it's a string
});

// POST
export const loginUser = async (formData: loginFormData) => {
  try {
    const response = await api.post('/accounts/labmate-login/', formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};

export const addEquipments = async (formData: any) => {
  try {
    const response = await api.post(
      '/departments/add-to-department/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};

export const addTroubleShootDetails = async (formData: any) => {
  try {
    const response = await api.post(
      '/departments/equipment-add-troubleshoots/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};

export const addArticle = async (formData: any) => {
  try {
    const response = await api.post(
      '/articles/labmate-article-upload/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};



//GET
export const getAllDepartments = async () => {
  try {
    const response = await api.get('/departments/department-list/', {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};

export const getAllDeptEquipmentList = async () => {
  try {
    const response = await api.get('/departments/department-equipment-list/', {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};
export const getAllResourcesList = async () => {
  try {
    const response = await api.get(
      '/departments/equipment-view-troubleshoots/',
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};


export const getAllArticles = async () => {
  try {
    const response = await api.get('/articles/labmate-article-list/', {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};
export const getResourceById = async (id:any) => {
  try {
    const response = await api.get(`/departments/troubleshoots/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Login Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};

export const getOneArticle = async (id: any) => {
  try {
    const response = await api.get(`/articles/labmate-details/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Fetch Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};


//DELETE
export const deleteArticle = async (id: any) => {
  try {
    const response = await api.delete(`/articles/labmate-delete/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Fetch Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};

export const deleteResourceById = async (id: any) => {
  try {
    const response = await api.delete(
      `/departments/remove-troubleshoot/${id}/`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Fetch Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};

export const deleteEquipment = async (id: any) => {
  try {
    const response = await api.delete(`/departments/remove-equipment/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Fetch Error:', error);

    return {
      success: false,
      error: true,
      message: error.response?.data || 'Error in API Call!',
    };
  }
};
