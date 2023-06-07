import { instance } from "../interceptor/Interceptor";

export const UploadingImage = async (formData) => {
  try {
    const response = await instance.post(`/api/upload/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
