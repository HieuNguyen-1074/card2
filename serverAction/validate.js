import { z } from 'zod';

// constant
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const card = z.object({
  title: z.string().min(1, "Title can't not be empty"),
  description: z.string().min(1, "Description can't be empty"),
  fileInput: z
    .any()
    .refine((file) => file?.size, `You have to upload a image for this card`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export const validate = {
  card,
};
