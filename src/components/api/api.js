const apiBaseUrl = 'http://51.112.12.168:8080/tne/api/v1'; // Replace with your API base URL

const apiRequest = async (url, method = 'GET', data = null) => {
  const apiUrl = `${apiBaseUrl}/${url}`;
  
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
      body: method === 'POST' ? JSON.stringify(data) : null,
    };

    const response = await fetch(apiUrl, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "API request failed");
    }

    return responseData;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};
export default apiRequest;