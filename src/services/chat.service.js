import axios from "axios";

class chatService {
  constructor() {
    
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

            // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
            // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /chat/projects 
  createOne = (resource, requestBody) => {
    return this.api.post(`/${resource}`, requestBody);
  };

  // GET /chat/projects
  getAll = (resource) => {
    return this.api.get(`/${resource}`);
  };

  // GET /chat/projects/:id
  getOne = (resource, id) => {
    return this.api.get(`/${resource}/${id}`);
  };

  // PUT /chat/projects/:id
  updateOne = (resource, id, requestBody) => {
    return this.api.put(`/${resource}/${id}`, requestBody);
  };

  // DELETE /chat/projects/:id
  deleteOne = (resource, id) => {
    return this.api.delete(`/${resource}/${id}`);
  };

  createChat = (user1, user2) => {
    return this.api.post(`/chats/create/${user1}/${user2}`);
  };

}

// Create one instance (object) of the service

const chat = new chatService()

export default chat;


// invoke with chatService.getOne("users", id)