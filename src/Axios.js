import axios from "axios";

export const doSubmit = (formdata) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post("http://localhost:3000/api/user/add", formdata)
      .then((data) => {
        resolve(data);
      })

      .catch((err) => {
        reject(err);
      });
  });
};
export const getUserDetails = () => {
  return new Promise(async (resolve, reject) => {
    axios
      .get("http://localhost:3000/api/user/getusers")
      .then((data) => {
        resolve(data.data.users);
      })

      .catch((err) => {
        reject(err);
      });
  });
};
export const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post("http://localhost:3000/api/user/getuser", { id })
      .then((data) => {
        resolve(data.data.user);
      })

      .catch((err) => {
        reject(err);
      });
  });
};
export const doUpdate = (formdata) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post("http://localhost:3000/api/user/update", formdata)
      .then((data) => {
        resolve(data.data.user);
      })

      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post("http://localhost:3000/api/user/delete", id)
      .then((data) => {
        resolve(data.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
