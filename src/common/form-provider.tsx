import type { ReactNode } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";

import { FormProvider as FormReact } from "react-hook-form";

interface FormProviderProps {
  methods: UseFormReturn<any>;
  onSubmitForm: SubmitHandler<any>;
  children: ReactNode;
}
function FormProvider(props: Readonly<FormProviderProps>) {
  const { methods, onSubmitForm, children } = props;
  return (
    <FormReact {...methods}>
      <form onSubmit={onSubmitForm} method="POST">
        {children}
      </form>
    </FormReact>
  );
}

export default FormProvider;
