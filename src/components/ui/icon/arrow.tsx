interface ArrowProps {
  className?: string;
  size?: number;
}

export const ArrowIcon = ({ className, size=24 }: ArrowProps) => {
  return (
    <svg
      className={className}
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.43 6.42999L20.5 12.5L14.43 18.57" />
      <path d="M3.5 12.5H20.33" />
    </svg>
  );
};
