import { useForm, useController, UseControllerProps } from "react-hook-form";

export function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
    </div>
  );
}
