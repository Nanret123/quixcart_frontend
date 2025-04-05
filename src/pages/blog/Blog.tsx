import React from "react";
import blogData from "../../data/blogs.json";

const Blog = () => {
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Latest from Blog</h2>
      <p className="section__subheader pb-8">
        Discover the latest blog posts and articles about fashion, travel, and
        more.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="blog__card cursor-pointer hover:scale-300"
          >
            <img src={blog.imageUrl} alt="blog image" />
            <div className="blog__card__content">
              <h6>{blog.subtitle}</h6>
              <h4>{blog.title}</h4>
              <p>{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
