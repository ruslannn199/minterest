"use client";

import { removeImageAction } from '@/actions';
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React, { FC } from "react";

type Props = {
  id: string;
  url: string;
};

export const RemoveImageButton: FC<Props> = ({ id, url }) => {
  const handleConfirm = async () => {
    await removeImageAction(id, url);
  };

  return (
    <Popconfirm
      title="Удаление изображение"
      okText="Да"
      cancelText="Нет"
      description="Вы точно хотите удалить изображение?"
      onConfirm={handleConfirm}
    >
      <Button danger icon={<DeleteOutlined />} />
    </Popconfirm>
  );
};
