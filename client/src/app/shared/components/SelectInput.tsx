import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

// Define the props with generic type
type Props<T extends FieldValues> = {
  items: { text: string; value: string }[];
  label: string;
} & UseControllerProps<T> &
  Partial<SelectInputProps>;

// Generic arrow function component
const SelectInput = <T extends FieldValues>(props: Props<T>) => {
  const { field, fieldState } = useController({ ...props });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={field.value || ""}
        label={props.label}
        onChange={field.onChange}
      >
        {props.items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message || ""}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
