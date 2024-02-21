import { useEffect, useState } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom.min";

import { Layout } from "../components/Layout";
import { client } from "../lib/createClient";
import { Header } from "../components/Header";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "blogPost",
        order: "-sys.createdAt",
      })
      .then(function (entries) {
        setPosts(entries.items);
      });
  });

  return (
    <Layout>
      <div className="container">
        <div className="row"></div>
        <main className="col-md-8">
          <h1 className="my-3">Todos os posts</h1>

          {posts.map((post) => (
            <div className="card mb-3" key={post.sys.id}>
              <div className="card-body">
                <h5 className="card-title">{post.fields.postTitle}</h5>
                <p className="card-text">{post.fields.postDescription}</p>
                <Link
                  to={`/post/${post.fields.postSlug}`}
                  className="card-link"
                >
                  ver post
                </Link>
              </div>
            </div>
          ))}

          <div className="mt-1">
            <Link to="/" className="btn btn-outline-primary">
              voltar para home
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
};
