import { ErrorMessage, Field, FieldProps } from 'formik';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {
  FileProps,
  InputProps,
  SelectProps,
  SubmitButtonProps,
  TextAreaProps,
} from '../types/formHelper';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BLOG_IMAGE_UPLOAD_URL } from '../config';

/**
 * Input type custom
 */
export const CustomInputField = ({
  id,
  field,
  placeholder,
  type = 'text',
}: InputProps): JSX.Element => {
  return (
    <>
      <Field
        id={id}
        className="form-control"
        placeholder={placeholder}
        type={type}
        {...field}
      />

      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </>
  );
};

/**
 * Input type "text"
 */
export const InputField = ({
  id,
  field,
  type = 'text',
  bootstrapClass = 'form-control',
  placeholder,
  label,
  gridLeft = 4,
  gridRight = 8,
}: InputProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={gridLeft}>
        {label}
      </Form.Label>
      <Col sm={gridRight}>
        <Field
          id={id}
          className={bootstrapClass}
          placeholder={placeholder}
          type={type}
          {...field}
        />

        <div style={{ color: 'red' }}>
          <ErrorMessage name={field.name} />
        </div>
      </Col>
    </Form.Group>
  );
};

/**
 * Text area
 */
export const TextAreaField = ({
  id,
  field,
  placeholder,
  label,
  rows = 15,
  gridLeft = 4,
  gridRight = 8,
}: TextAreaProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={gridLeft}>
        {label}
      </Form.Label>
      <Col sm={gridRight}>
        <Field
          id={id}
          className="form-control"
          placeholder={placeholder}
          rows={rows}
          component="textarea"
          {...field}
        />

        <div style={{ color: 'red' }}>
          <ErrorMessage name={field.name} />
        </div>
      </Col>
    </Form.Group>
  );
};

/**
 * Input type for blog content
 */
export const BlogContentField = ({
  id,
  field,
  label,
  gridLeft = 4,
  gridRight = 8,
}: TextAreaProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3" id={id}>
      <Form.Label column sm={gridLeft}>
        {label}
      </Form.Label>
      <Col sm={gridRight}>
        <Field name={field.name}>
          {({ field, form }: FieldProps) => (
            <CKEditor
              editor={ClassicEditor}
              data={field.value}
              onChange={(event: any, editor: ClassicEditor) => {
                // TODO:: check if image is delete and manually trigger the axios to delete image
                form.setFieldValue(field.name, editor.getData());
              }}
              config={{
                // CKEditor configuration options go here
                ckfinder: {
                  uploadUrl: `${BLOG_IMAGE_UPLOAD_URL}`,
                },
              }}
            />
          )}
        </Field>

        <div style={{ color: 'red' }}>
          <ErrorMessage name={field.name} />
        </div>
      </Col>
    </Form.Group>
  );
};

/**
 * Input type for comment content
 */
export const CommentField = ({
  id,
  field,
  label,
  gridLeft = 4,
  gridRight = 8,
}: TextAreaProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3" id={id}>
      <Form.Label column sm={gridLeft}>
        {label}
      </Form.Label>
      <Col sm={gridRight}>
        <Field name={field.name}>
          {({ field, form }: FieldProps) => (
            <CKEditor
              editor={ClassicEditor}
              data={field.value}
              onChange={(event: any, editor: ClassicEditor) => {
                form.setFieldValue(field.name, editor.getData());
              }}
              config={{
                // CKEditor configuration options go here
                toolbar: [
                  'undo',
                  'redo',
                  'bold',
                  'italic',
                  'Link',
                  'numberedList',
                  'bulletedList',
                ],
              }}
            />
          )}
        </Field>

        <div style={{ color: 'red' }}>
          <ErrorMessage name={field.name} />
        </div>
      </Col>
    </Form.Group>
  );
};

/**
 * Input type "select"
 */
export const SelectField = ({
  id,
  field,
  label,
  disabledValue = false,
  selectOptions,
  gridLeft = 4,
  gridRight = 8,
}: SelectProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={gridLeft}>
        {label}
      </Form.Label>
      <Col sm={gridRight}>
        <Field
          id={id}
          className="form-select"
          as="select"
          {...field}
          disabled={disabledValue}
        >
          <option value="">Select ...</option>
          {selectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </Field>

        <div style={{ color: 'red' }}>
          <ErrorMessage name={field.name} />
        </div>
      </Col>
    </Form.Group>
  );
};

/**
 * Handle change for file upload
 */
const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: any
) => {
  const file = event.currentTarget.files && event.currentTarget.files[0];
  if (file) {
    setFieldValue('image', file);
  }
};

/**
 * Input type "file"
 */
export const FileField = ({
  id,
  field,
  label,
  acceptType,
  formikProps,
  gridLeft = 4,
  gridRight = 8,
}: FileProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={gridLeft}>
        {label}
      </Form.Label>
      <Col sm={gridRight}>
        <input
          id={id}
          type="file"
          className="form-control"
          accept={acceptType}
          onChange={(event) =>
            handleFileChange(event, formikProps.setFieldValue)
          }
        />

        <div style={{ color: 'red' }}>
          <ErrorMessage name={field.name} />
        </div>
      </Col>
    </Form.Group>
  );
};

export const SubmitButton = ({
  id,
  name,
  gridLeft = 4,
  gridRight = 8,
}: SubmitButtonProps): JSX.Element => {
  return (
    <div className="mb-3 row">
      <Col sm={{ span: gridRight, offset: gridLeft }}>
        <Button id={id} type="submit">
          {name}
        </Button>
      </Col>
    </div>
  );
};
