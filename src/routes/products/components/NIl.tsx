export default function NIl({
  contents,
  children,
}: {
  contents: string | number | null;
  children: React.ReactNode;
}) {
  if (contents === null) {
    return null;
  }
  if (typeof contents === 'string' && contents.trim().length === 0) {
    return null;
  }
  return <li>{children}</li>;
}
