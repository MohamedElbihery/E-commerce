import ky from "ky";

export const apiClient = () => {
  return ky.create({
    prefixUrl: "http://localhost:5000/api",
    hooks: {
      beforeRequest: [
        (request) => {
          const token = localStorage.getItem("token");
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        },
      ],
    },
  });
};
