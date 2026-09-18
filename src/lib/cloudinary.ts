const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const publicId = import.meta.env.VITE_CLOUDINARY_IMAGE_PUBLIC_ID;

export const profileImageUrl =
  cloudName && publicId
    ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`
    : '/my-photo.png';
