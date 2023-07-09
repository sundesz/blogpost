import { FieldProps } from 'formik';

export interface InputProps extends FieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  bootstrapClass?: string;
  gridLeft?: number;
  gridRight?: number;
}

export interface TextAreaProps extends FieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  gridLeft?: number;
  gridRight?: number;
}

export interface SelectProps extends FieldProps {
  id?: string;
  label?: string;
  disabledValue?: boolean;
  selectOptions: { name: string; value: string }[];
  gridLeft?: number;
  gridRight?: number;
}

export interface FileProps extends FieldProps {
  id?: string;
  label?: string;
  acceptType?: string;
  formikProps?: any;
  gridLeft?: number;
  gridRight?: number;
}

export interface SubmitButtonProps {
  id: string;
  name: string;
  gridLeft?: number;
  gridRight?: number;
}
