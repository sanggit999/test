import { Input } from "antd";
import { ReactNode } from "react";

interface InputProps {
  prefix?: ReactNode;
  placeholder?: string;
  type?: "text" | "password" | "textarea";
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  rows?: number;
}

const BaseInput = ({
  prefix,
  placeholder,
  type = "text",
  value,
  onChange,
  className,
  rows,
}: InputProps) => {
  return type === "textarea" ? (
    <Input.TextArea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      rows={rows ?? 4} // Mặc định 4 dòng
    />
  ) : (
    <Input
      prefix={prefix}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={`h-10 ${className}`}
    />
  );
};

export default BaseInput;
