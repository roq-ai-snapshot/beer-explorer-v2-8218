import * as yup from 'yup';
import { locationValidationSchema } from 'validationSchema/locations';

export const beerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  brewery: yup.string().required(),
  alcohol_content: yup.number().required(),
  description: yup.string().required(),
  interesting_facts: yup.string(),
  hero_image: yup.string(),
  account_id: yup.string().nullable().required(),
  location: yup.array().of(locationValidationSchema),
});
