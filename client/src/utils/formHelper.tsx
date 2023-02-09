import { ErrorMessage, Field, FieldProps } from 'formik';
import { Button, Col, Form, Row } from 'react-bootstrap';

const GRID_LEFT = 4;
const GRID_RIGHT = 8;

interface InputProps extends FieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  bootstrapClass?: string;
}

interface TextAreaProps extends FieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
}

interface SelectProps extends FieldProps {
  id?: string;
  label?: string;
  disabledValue?: boolean;
  selectOptions: { name: string; value: string }[];
}

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

export const InputField = ({
  id,
  field,
  type = 'text',
  bootstrapClass = 'form-control',
  placeholder,
  label,
}: InputProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={GRID_LEFT}>
        {label}
      </Form.Label>
      <Col sm={GRID_RIGHT}>
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

export const TextAreaField = ({
  id,
  field,
  placeholder,
  label,
  rows = 15,
}: TextAreaProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={GRID_LEFT}>
        {label}
      </Form.Label>
      <Col sm={GRID_RIGHT}>
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

export const SelectField = ({
  id,
  field,
  label,
  disabledValue = false,
  selectOptions,
}: SelectProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={GRID_LEFT}>
        {label}
      </Form.Label>
      <Col sm={GRID_RIGHT}>
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

export const SubmitButton = ({
  id,
  name,
}: {
  id?: string;
  name: string;
}): JSX.Element => {
  return (
    <div className="mb-3 row">
      <Col sm={{ span: GRID_RIGHT, offset: GRID_LEFT }}>
        <Button id={id} type="submit">
          {name}
        </Button>
      </Col>
    </div>
  );
};
