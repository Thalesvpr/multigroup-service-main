import { z, ZodSchema } from 'zod';
import { FieldValidationError, IValidationProvider } from './validation.interface';
import { Field } from 'proto/generated/proto/shared';

export class ZodValidator implements IValidationProvider {
    validateWith(validator: (input: any) => any, input: any) {
        throw new Error('Method not implemented.');
    }


    
    validate<T>(object: any, schema: ZodSchema) {
        try {
            schema.parse(object);  // Zod faz a validação e retorna caso não haja erros
            console.log('Validation successful:', object);
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Transforma os erros do Zod em um formato FieldError
                const errors: Field[] = error.errors.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }));
                throw new FieldValidationError(errors) 
            } else {
                // Para erros não relacionados à validação de esquema, tratamos como um erro genérico
                const errors: Field[] = [{
                    field: "unknown",
                    message: error.message
                }]
                throw new FieldValidationError(errors) 

            }
        }
    }
}
