import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './constants';
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return cloudinary.config({
        cloud_name: "dkknun8xu",
        api_key: "138859787157657",
        api_secret: "WvWySeeE5Bkoiu23a4-O6hT95R0",
    })
  },
};