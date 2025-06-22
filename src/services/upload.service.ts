/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/return-await */
import axios from "axios";

const API_ENDPOINT = {
  CREATE: "/upload/image",
  CREATE_AUDIO: "/video/upload",
};

const BASE_URL_SERVER_UPLOAD = import.meta.env.VITE_BASE_URL_UPLOAD;

class UploadServices {
  uploadImage = async (data: any) => {
    return await axios.post(BASE_URL_SERVER_UPLOAD + API_ENDPOINT.CREATE, data);
  };
  uploadAudio = async (data: any) => {
    console.log("data", data);
    return await axios.post(
      BASE_URL_SERVER_UPLOAD + API_ENDPOINT.CREATE_AUDIO,
      data
    );
  };
}

const uploadServices = new UploadServices();

export default uploadServices;
