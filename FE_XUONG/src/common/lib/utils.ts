import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const CLOUDINARY_NAME = "dn2nmleva";
const CLOUDINARY_UPLOAD_PRESET = "upload-gallery";
const CLOUDINARY_FOLDER = "reactjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", CLOUDINARY_FOLDER);

  //Up load len cloudinary

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      formData
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Upload failed: ", response.statusText);
    }
  } catch (error) {
    console.error("Error uploading file", error);
  }
}
