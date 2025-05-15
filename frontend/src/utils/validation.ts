import * as yup from 'yup';

export const clientSchema = yup.object({
  name: yup.string().required('Client name is required'),
  category: yup.string().required('Category is required'),
  representative: yup.string(),
  email: yup.string().email('Invalid email format'),
  phone: yup.string(),
  bankAccount: yup.string(),
});

export const restaurantProfileSchema = yup.object({
  name: yup.string().required('Restaurant name is required'),
  completeName: yup.string(),
  contactNumber: yup.string().required('Contact number is required'),
  ownerName: yup.string().required('Owner name is required'),
  ownerEmail: yup.string().email('Invalid email format'),
  ownerPhone: yup.string().required('Owner phone is required'),
});

export const restaurantTypeSchema = yup.object({
    type: yup.string().required('Restaurant type is required'),
    cuisine: yup.string().required('Cuisine type is required'),
    openingHour: yup.string().required('Opening hour is required'),
    closingHour: yup.string().required('Closing hour is required'),
  });
  
  export const menuItemSchema = yup.object({
    name: yup.string().required('Menu item name is required'),
    price: yup.number().required('Price is required').positive('Price must be positive'),
    description: yup.string(),
    category: yup.string().required('Category is required'),
  });