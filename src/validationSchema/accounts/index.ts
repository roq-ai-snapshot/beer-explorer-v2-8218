import * as yup from 'yup';
import { beerValidationSchema } from 'validationSchema/beers';

export const accountValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  beer: yup.array().of(beerValidationSchema),
});
