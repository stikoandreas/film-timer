import { FormErrors, FormValidationResult } from '@mantine/form/lib/types';
import { EditModal } from './EditModal';

export default {
  title: 'Edit Motal',
};

export const Usage = () => (
  <EditModal
    validate={(): FormValidationResult => ({ hasErrors: false, errors: {} as FormErrors })}
    nameInputProps={{}}
    durationInputProps={{}}
    chimeInputProps={{}}
  />
);
