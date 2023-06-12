import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getBeerById, updateBeerById } from 'apiSdk/beers';
import { Error } from 'components/error';
import { beerValidationSchema } from 'validationSchema/beers';
import { BeerInterface } from 'interfaces/beer';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AccountInterface } from 'interfaces/account';
import { getAccounts } from 'apiSdk/accounts';

function BeerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BeerInterface>(
    () => (id ? `/beers/${id}` : null),
    () => getBeerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BeerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBeerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/beers');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<BeerInterface>({
    initialValues: data,
    validationSchema: beerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Beer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="type" mb="4" isInvalid={!!formik.errors?.type}>
              <FormLabel>Type</FormLabel>
              <Input type="text" name="type" value={formik.values?.type} onChange={formik.handleChange} />
              {formik.errors.type && <FormErrorMessage>{formik.errors?.type}</FormErrorMessage>}
            </FormControl>
            <FormControl id="brewery" mb="4" isInvalid={!!formik.errors?.brewery}>
              <FormLabel>Brewery</FormLabel>
              <Input type="text" name="brewery" value={formik.values?.brewery} onChange={formik.handleChange} />
              {formik.errors.brewery && <FormErrorMessage>{formik.errors?.brewery}</FormErrorMessage>}
            </FormControl>
            <FormControl id="alcohol_content" mb="4" isInvalid={!!formik.errors?.alcohol_content}>
              <FormLabel>Alcohol Content</FormLabel>
              <NumberInput
                name="alcohol_content"
                value={formik.values?.alcohol_content}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('alcohol_content', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors?.alcohol_content && <FormErrorMessage>{formik.errors?.alcohol_content}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
            </FormControl>
            <FormControl id="interesting_facts" mb="4" isInvalid={!!formik.errors?.interesting_facts}>
              <FormLabel>Interesting Facts</FormLabel>
              <Input
                type="text"
                name="interesting_facts"
                value={formik.values?.interesting_facts}
                onChange={formik.handleChange}
              />
              {formik.errors.interesting_facts && (
                <FormErrorMessage>{formik.errors?.interesting_facts}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="hero_image" mb="4" isInvalid={!!formik.errors?.hero_image}>
              <FormLabel>Hero Image</FormLabel>
              <Input type="text" name="hero_image" value={formik.values?.hero_image} onChange={formik.handleChange} />
              {formik.errors.hero_image && <FormErrorMessage>{formik.errors?.hero_image}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<AccountInterface>
              formik={formik}
              name={'account_id'}
              label={'Select Account'}
              placeholder={'Select Account'}
              fetcher={getAccounts}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'beer',
  operation: AccessOperationEnum.UPDATE,
})(BeerEditPage);
