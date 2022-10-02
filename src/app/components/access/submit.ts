import { BaseSyntheticEvent } from "react";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import AccessHandler from "@components/access/handler";
import FormFields from "@components/access/form_fields";

export default function useSubmitter(
  submitter: AccessHandler,
  handler: UseFormHandleSubmit<FormFields>
): (e?: BaseSyntheticEvent<object, any, any>) => Promise<void> {
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const { email, password } = data;
    if (email && password) {
      submitter(email, password);
    } else {
      submitter();
    }
  };

  return handler(onSubmit);
}
