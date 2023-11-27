type ErrorMessageProps = {
  message: string;
  className?: string;
};

const InputErrorMessage = (props: ErrorMessageProps) => {
  const { message, className } = props;
  return <p className={`${className}`}>{message}</p>;
};

export default InputErrorMessage;
