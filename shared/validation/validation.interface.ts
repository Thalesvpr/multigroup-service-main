import { ErrorData, Field, FieldError } from 'proto/generated/proto/shared';

// interface FieldError {
//   field: string;
//   message: string;

// }

export class FieldValidationError implements FieldError{
  public errors: Field[];
  constructor(errors: Field[]){
    this.errors = errors;
  }
}

  export interface IValidationProvider{
    validate<T>(object: T, schema: any): void;
    validateWith(validator: (input: any) => any, input: any): void;
  }