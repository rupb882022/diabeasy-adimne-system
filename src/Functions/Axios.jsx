import axios from "axios";

export const upiUrl='http://proj.ruppin.ac.il/bgroup88/prod/api/'
export const ImageUri='http://proj.ruppin.ac.il/bgroup88/prod/uploadFiles/'

export const Axios = (url, method, body) =>
  new Promise((resolve, reject) => {
    const configurationObject = {
      url: upiUrl+url,
      method: method,
      data: body
    }
   
    axios(configurationObject)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve(response);
        } 
        else {
          throw new Error(response);
        }
      })
      .catch((error) => {
        console.log("body=>",body);
        console.log("url=>",  upiUrl+url)
        console.log("method=>", method)
        reject(error.response.status);
      });
  })