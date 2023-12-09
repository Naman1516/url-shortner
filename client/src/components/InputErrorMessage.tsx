import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ErrorMessageProps = {
  message: string;
  className?: string;
};

const InputErrorMessage = (props: ErrorMessageProps) => {
  const { message, className } = props;
  return (
    <Alert variant="destructive" className={`border-0 ${className}`}>
      <AlertDescription className="flex items-center gap-2">
        <AlertCircle size={15} />
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default InputErrorMessage;
