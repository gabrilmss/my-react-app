import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

//import Pagination from "@mui/material/Pagination";
//import Stack from "@mui/material/Stack";

import { Layout } from "../components/Layout";
import { client } from "../lib/createClient";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [proximoAtivo, setProximoEnabled] = useState(true);
  const [anteriorAtivo, setAnteriorEnabled] = useState(false);
  const page_size = 2;
  const history = useHistory();
  const handleButtonClick = () => {
    history.push("/");
  };

  useEffect(() => {
    client
      .getEntries({
        content_type: "blogPost",
        order: "-sys.createdAt",
      })
      .then(function (entries) {
        setTotalItems(entries.items.length);
        setTotalPages(Math.ceil(entries.items.length / page_size));
      });

    //buscarEntradas(0); //avaliar
  }, []);

  function buscarEntradas(skip) {
    client

      .getEntries({
        content_type: "blogPost",
        limit: page_size,
        skip: skip,
        order: "-sys.createdAt",
      })
      .then(function (entries) {
        setPosts(entries.items);
      });
  }

  useEffect(() => {
    buscarEntradas((currentPage - 1) * page_size);
  }, [currentPage, totalPages]);

  function atualizaPageNumber(avanca) {
    if (avanca) {
      setCurrentPage((currentPage) => currentPage + 1);
    } else {
      setCurrentPage((currentPage) => currentPage - 1);
    }

    buscarEntradas(currentPage * page_size);

    if (currentPage == 1) {
      setProximoEnabled(true);
    } else if (currentPage > 1) {
      setAnteriorEnabled(true);
    } else if (currentPage == totalPages) {
      setProximoEnabled(false);
    } else {
      setAnteriorEnabled(false);
    }
  }

  console.log("currentPage", currentPage);
  console.log("variável totalItems: ", totalItems);
  console.log("variável totalCurrentPage: ", currentPage);
  console.log("variável totalPages: ", totalPages);

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

          <div
            className="button-container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              className="btn btn-outline-primary"
              onClick={() => atualizaPageNumber(true)}
              disabled={!proximoAtivo}
            >
              próxima
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={handleButtonClick}
            >
              voltar para home
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => atualizaPageNumber(false)}
              disabled={!anteriorAtivo}
            >
              anterior
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
};
