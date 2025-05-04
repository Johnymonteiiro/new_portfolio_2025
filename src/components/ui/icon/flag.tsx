interface FlagProps {
  className?: string;
  size?: number;
}

export const FlagIcon = ({ className, size=24}: FlagProps) => {
  return (
    <svg
      className={className}
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.57501 0.999878V10.9999" />
      <path d="M2.57501 2H8.17501C9.52501 2 9.82501 2.75 8.87501 3.7L8.27501 4.3C7.87501 4.7 7.87501 5.35 8.27501 5.7L8.87501 6.3C9.82501 7.25 9.47501 8 8.17501 8H2.57501" />
    </svg>
  );
};
