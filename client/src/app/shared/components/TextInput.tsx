import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

// Define the props with generic type
type Props<T extends FieldValues> = UseControllerProps<T> & TextFieldProps;

// Generic arrow function component
const TextInput = <T extends FieldValues>(props: Props<T>) => {
  const { field, fieldState } = useController({ ...props });

  return (
    <TextField
      {...props}
      {...field}
      value={field.value || ""}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};

export default TextInput;
