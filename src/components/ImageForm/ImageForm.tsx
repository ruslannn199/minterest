'use client';

import { IImage } from "@/server/types";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import Dragger from "antd/es/upload/Dragger";
import React, { FC } from "react";

type Props = {
  id?: string;
  initialValues?: Omit<IImage, "id">;
};

export const ImageForm: FC<Props> = ({ id, initialValues }: Props) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ name: initialValues?.name, tags: initialValues?.tags }}
      style={{ maxWidth: 600, justifySelf: 'center', width: '100%' }}
    >
      <FormItem
        label="Название"
        name="name"
        rules={[{ required: true, message: "Пожалуйста, введите название" }]}
      >
        <Input />
      </FormItem>
      <FormItem label="Теги">
        <Input />
      </FormItem>
      <FormItem label="Загрузить изображение">
        <Dragger>
          <InboxOutlined />
          Нажмите или перетащите изображение
        </Dragger>
      </FormItem>
    </Form>
  );
};
