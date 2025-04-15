import { IImage } from "@/server/types";
import { EditFilled } from '@ant-design/icons';
import { Button, Card, Flex, Image, Tag } from "antd";
import Link from 'next/link';
import React, { FC } from "react";
import { RemoveImageButton } from '../RemoveImageButton';

type Props = {
  image: IImage;
};

export const ImageCard: FC<Props> = ({ image }) => {
  const { id, name, url, tags } = image;

  return (
    <Card
      hoverable
      cover={<Image src={`/uploads/${url}`} alt={name} />}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>{name}</div>
      {tags.length > 0 && (
        <>
          <div>Теги:</div>
          <Flex wrap>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Flex>
        </>
      )}
      <Flex style={{ marginTop: 8, width: '100%' }} justify='space-between'>
        <Link href={`images/${id}`}><Button icon={<EditFilled />} /></Link>
        <RemoveImageButton id={id} url={url} />
      </Flex>
    </Card>
  );
};
