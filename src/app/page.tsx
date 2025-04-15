import { getImagesAction } from '@/actions';
import { ImageCard, LoadMore, Order, SearchInput, TagFilter } from '@/components';
import { Col, Flex, Row } from 'antd';

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const result = await getImagesAction(params);

  return (
    <Flex vertical style={{ width: '100%' }} gap={32}>
      <SearchInput />
      <TagFilter />
      <Order />
      {result.items.length === 0 && <p style={{ textAlign: 'center', fontSize: 36 }}>Изображений не найдено</p>}
      <Row gutter={[16, 16]}>
        {result.items.map((image, index) => (
          <Col key={index} span={6}><ImageCard image={image} /></Col>
        ))}
      </Row>
      {result.paging.total > result.items.length && <LoadMore />}
    </Flex>
  );
}
