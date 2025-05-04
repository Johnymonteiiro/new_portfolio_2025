interface MenuProps {
  className?: string;
  size?: number;
}

export const MenuIcon = ({ className, size=24 }: MenuProps) => {
  return (
    <svg
      className={className}
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 25 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1H18" />
      <path d="M1 4H15" />
      <path d="M1 7H11" />
      <path d="M1 10H7" />
    </svg>
  );
};
