import { LucideIcon, Loader2 } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

interface PrimaryButtonProps {
  title: string;
  icon: LucideIcon;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading?: boolean;
}

export default function PrimaryButton({
  title,
  icon: Icon,
  className,
  type = "button",
  onClick,
  isLoading: externalLoading = false,
}: PrimaryButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = externalLoading || internalLoading;

  const handleClick = () => {
    if (type === "button" && onClick) {
      setInternalLoading(true);
      onClick();
      setTimeout(() => {
        setInternalLoading(false);
      }, 2000);
    }
  };

  return (
    <Button
      variant="default"
      type={type}
      className={`${className} ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin w-5 h-5" />
      ) : (
        <>
          {title}
          <Icon className="ml-2" />
        </>
      )}
    </Button>
  );
}