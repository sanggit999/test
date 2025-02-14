import { Button } from "antd";

interface ButtonProps {
  type?: "primary" | "default" | "dashed" | "link" | "text";
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  loading?: boolean;
}

const BaseButton = ({
  type = "default",
  htmlType = "button",
  className,
  onClick,
  children,
  style,
  loading = false,
}: ButtonProps) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      className={`min-h-10 ${className}`}
      onClick={onClick}
      style={style}
      loading={loading}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
