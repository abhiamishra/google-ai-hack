import { markdownify } from "@lib/utils/textConverter";

function Checklist({ data }) {
  const { frontmatter } = data;
  const { title, faqs } = frontmatter;
  return (
    <>
      <h1> Test</h1>
    </>
  );
}

export default Checklist;
