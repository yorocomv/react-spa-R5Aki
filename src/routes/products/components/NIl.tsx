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
  return <li>{children}</li>;
}
