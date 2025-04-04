import { Box, Button } from "@mui/material";
import { useCounterStore } from "../../lib/stores/counterStore";
const Counter = () => {
  const { count, increment, decrement, incrementBy } = useCounterStore();

  const handleIncrement = () => {
    increment();
  };
  const handleDecrement = () => {
    decrement();
  };

  const handleIncrementBy = () => {
    incrementBy(5);
  };
  return (
    <Box display="flex" gap={2} alignItems="center">
      {count}
      <Button variant="contained" onClick={handleIncrement}>
        Increment
      </Button>
      <Button variant="contained" onClick={handleDecrement}>
        Decrement
      </Button>
      <Button variant="contained" onClick={handleIncrementBy}>
        Increment by
      </Button>
    </Box>
  );
};

export default Counter;
