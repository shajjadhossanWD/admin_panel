import BlogArea from "../../Components/Blog/BlogArea";
import PageTitle from "../../Components/Common/PageTitle";

function Blog() {
  return (
    <div className="blog-wrapper">
      <PageTitle title="Blog" />
      <BlogArea />
    </div>
  );
}

export default Blog;
