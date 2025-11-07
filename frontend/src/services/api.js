const API_BASE_URL = '/api';

export const exerciseService = {
  getAllExercises: async () => {
    const response = await fetch(`${API_BASE_URL}/exercises`);
    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }
    return response.json();
  },

  getExerciseById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch exercise');
    }
    return response.json();
  }
};

export const xsltService = {
  transform: async (xmlInput, xsltTemplate) => {
    const response = await fetch(`${API_BASE_URL}/xslt/transform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        xmlInput,
        xsltTemplate
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to transform (${response.status}): ${errorText}`);
    }
    
    return response.json();
  }
};
