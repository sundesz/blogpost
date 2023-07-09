export const slugifyOptions = {
  lower: true,
};

export const BACKEND_BASE_URL = '/api/v1';
export const BLOG_IMAGE_UPLOAD_URL = `${process.env.VITE_BACKEND_URL}${BACKEND_BASE_URL}/blogs/blogImage`;
export const PROFILE_IMAGE = `${process.env.VITE_BACKEND_URL}/images/profile_pictures`;

export const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
