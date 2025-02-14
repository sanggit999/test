import { Form, FormInstance } from "antd";
import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onFinish: (value: any) => void;
  layout?: "vertical" | "horizontal";
  name?: string;
  form?: FormInstance<any>;
}

const BaseForm = ({
  children,
  onFinish,
  name,
  layout = "vertical",
  form,
}: FormProps) => {
  return (
    <Form layout={layout} onFinish={onFinish} form={form}>
      <Form.Item name={name}>{children}</Form.Item>
    </Form>
  );
};

export default BaseForm;
