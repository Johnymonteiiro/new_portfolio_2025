interface CalendarProps {
  className?: string;
  size?: number;
}

export const CalendarIcon = ({ className, size=24}: CalendarProps) => {
  return (
    <svg
      className={className}
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 2V5" />
      <path d="M16 2V5" />
      <path d="M3.5 9.09H20.5" />
      <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" />
      <path d="M15.6947 13.7H15.7037" />
      <path d="M15.6947 16.7H15.7037" />
      <path d="M11.9955 13.7H12.0045" />
      <path d="M11.9955 16.7H12.0045" />
      <path d="M8.29431 13.7H8.30329" />
      <path d="M8.29431 16.7H8.30329" />
    </svg>
  );
};
