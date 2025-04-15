import { getImageAction } from '@/actions';
import { ImageForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
}

export default async function EditImage({ params }: Props) {
  const { id } = await params;

  const image = await getImageAction(id);
  return <ImageForm initialValues={image} id={id} />;
}