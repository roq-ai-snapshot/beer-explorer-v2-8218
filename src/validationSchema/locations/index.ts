import * as yup from 'yup';

export const locationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  beer_id: yup.string().nullable().required(),
});
