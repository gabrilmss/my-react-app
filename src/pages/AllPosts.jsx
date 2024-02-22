import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

//import Pagination from "@mui/material/Pagination";
//import Stack from "@mui/material/Stack";

import { Layout } from "../components/Layout";
import { client } from "../lib/createClient";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [totalItems, setTotalItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const page_size = 2;

  useEffect(() => {
    client
      .getEntries({
        content_type: "blogPost",
        order: "-sys.createdAt",
      })
      .then(function (entries) {
        setTotalItems(entries.items.length);
      });

    client

      .getEntries({
        content_type: "blogPost",
        limit: page_size,
        skip: currentPage,
        order: "-sys.createdAt",
      })
      .then(function (entries) {
        setPosts(entries.items);
      });
  }, []);

  function atualizaPageNumber() {
    setTotalPages(totalItems / page_size);
    if (currentPage >= totalPages) {
      console.log("opa");
      setButtonDisabled(true);
    } else {
      setCurrentPage(currentPage + 1);
    }
    console.log("currentPage", currentPage);

    console.log("variável totalItems: ", totalItems);
    console.log("variável totalCurrentPage: ", currentPage);
    console.log("variável totalPages: ", totalPages);

    client

      .getEntries({
        content_type: "blogPost",
        limit: page_size,
        skip: currentPage,
        order: "-sys.createdAt",
      })
      .then(function (entries) {
        setPosts(entries.items);
      });
  }

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

          <button
            className="btn btn-outline-primary"
            onClick={atualizaPageNumber}
            disabled={isButtonDisabled}
          >
            ver mais
          </button>
        </main>
      </div>
    </Layout>
  );
};
