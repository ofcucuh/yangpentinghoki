class ApiClient {
    static async callPost(url, params) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        });
  
        if (response.ok) {
          const data = await response.json();
  
          return data;
        } else {
          const error = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        // console.log(error)
        throw new Error(error.message);
      }
    }
  
    static async callGet(url) {
      try {
        const response = await fetch(url, {
          method:'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // console.log(response)
        if (response.ok) {
          const data = await response.json();
  
          return data;
        } else {
          const error = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        // console.log(error)
        throw new Error(error.message);
      }
    }
  }
  
export default ApiClient;  