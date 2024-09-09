export function Button({ children, ...props }: any) {
  return (
    <button {...props} className="p-2 rounded-md border">
      {children}
    </button>
  );
}
