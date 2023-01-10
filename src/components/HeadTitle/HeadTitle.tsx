// to prevent a nextjs issue where `<title>some string {t('some.intl.key)}</title>` is seen as an array server-side
// > Warning: A title element received an array with more than 1 element as children.
// > In browsers title Elements can only have Text Nodes as children.
// > If the children being rendered output more than a single text node in aggregate the browser
// > will display markup and comments as text in the title and hydration will likely fail
// > and fall back to client rendering
type HeadTitleProps = { title: string };
export const HeadTitle = ({ title }: HeadTitleProps) => (
  <title>{['Saad Tazi', title].join(' = ')}</title>
);
