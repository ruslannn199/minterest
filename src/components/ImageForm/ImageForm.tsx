"use client";

import { removeImageUploadAction, saveImageAction } from "@/actions";
import { IImage } from "@/server/types";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Upload,
  type UploadFile,
  Button,
  Tag,
  Image,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { FC, useEffect, useRef, useState } from "react";

type Props = {
  id?: string;
  initialValues?: Omit<IImage, "id">;
};

export const ImageForm: FC<Props> = ({ id, initialValues }: Props) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<UploadFile | null>(null);
  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (file) {
        await removeImageUploadAction(file.name);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleTagInputConfirm = () => {
    if (tags.includes(inputValue) || inputValue === "") {
      return;
    }

    setTags([...tags, inputValue]);
    setInputValue("");
  };

  const handleSubmit = async (values: Pick<IImage, "name">) => {
    if (id || (file?.name)) {
      await saveImageAction({ ...values, tags, url: (file?.name || initialValues?.url) as string, id });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        width: 600,
      }}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{ name: initialValues?.name }}
        onFinish={handleSubmit}
      >
        <FormItem
          label="Название"
          name="name"
          rules={[{ required: true, message: "Пожалуйста, введите название" }]}
        >
          <Input />
        </FormItem>
        <FormItem label="Теги">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {tags.map((tag, index) => (
              <Tag
                key={index}
                closable
                onClose={() => setTags(tags.filter((_, i) => i !== index))}
              >
                {tag}
              </Tag>
            ))}
          </div>
          <Input
            onPressEnter={handleTagInputConfirm}
            onBlur={handleTagInputConfirm}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </FormItem>
        {id ? (
          <Image src={`/uploads/${initialValues?.url}`} alt={initialValues?.name} />
        ) : (
          <Upload
            name="image"
            accept="image/*"
            listType="picture-card"
            action="http://localhost:8000/upload"
            maxCount={1}
            onChange={async (info) => {
              if (info.file.status === "done") {
                setFile({
                  ...info.file,
                  name: info.file.response?.filename ?? info.file.name,
                });
              } else {
                setFile(null);
              }
            }}
            onRemove={async () => {
              if (file?.name) {
                await removeImageUploadAction(file.name);
              }
            }}
          >
            <button
              type="button"
              style={{
                border: 0,
                background: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <PlusOutlined />
              Загрузить
            </button>
          </Upload>
        )}
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 16 }}
          disabled={file === null && !id}
        >
          Сохранить
        </Button>
      </Form>
    </div>
  );
};
