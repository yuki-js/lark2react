interface DividerProps {
  color?: string;
}

export function Divider({ color = "lightgray" }: DividerProps) {
  return <hr color={color} />;
}
