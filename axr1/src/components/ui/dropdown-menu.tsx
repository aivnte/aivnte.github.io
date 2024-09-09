export function DropdownMenu({ children }: any) {
  return <div>{children}</div>;
}

export function DropdownMenuTrigger({ children }: any) {
  return <div>{children}</div>;
}

export function DropdownMenuContent({ children }: any) {
  return <div className="absolute">{children}</div>;
}

export function DropdownMenuItem({ children, onClick }: any) {
  return (
    <div onClick={onClick} className="cursor-pointer p-2 hover:bg-gray-100">
      {children}
    </div>
  );
}
