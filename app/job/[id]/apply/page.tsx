import ApplyForm from "./ApplyForm";

interface ApplyPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { id } = await params; // Resolving the Promise to get 'id'

  return <ApplyForm jobId={id} />;
}
