import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "gatsby";
import Title from "../../atoms/titles/Title";
import BlogGallery from "./BlogGallery";


export default function ManageBlog({ params }: { params: any }) {
  const [post, setpost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);
  

  useEffect(() => {
    if (params.slug) {
      setSlug(params.slug);
    }
  }, [params.slug]);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`/api/posts/${slug}`);
      setpost(res.data);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch post", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;


    getBlogs();
  }, [slug]);

  

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-1">
        <Link to="/admin/posts">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <Title>Edit Blog</Title>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      ) : post ? (
        <div className="bg-white shadow-md rounded-lg p-6">

          <div className="mb-6">
            <h1 className="text-4xl font-extrabold mb-2">Manage Edition</h1>
            <p className="text-lg text-gray-600">
              Title: <span className="font-semibold">{post.title_fr || post.title_en}</span>
            </p>
            <p className="text-lg text-gray-600">
              Type: <span className="font-semibold">{post.type}</span>
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <img
                src={`${process.env.GATSBY_API_URL}${post?.image}`}
                alt="Affiche 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">

                <h2 className="text-2xl font-bold mb-1">
                  Subtitle :

                </h2>
                <p className="text-primary ml-3">
                  {post.subtitle_en_en || post.subtitle_en_fr}
                </p>
                <h2 className="text-2xl font-bold mb-1">
                    Summary :

                </h2>

                <p className="text-gray-700 ml-3">
                    {post.summary_en || post.summary_fr}
                </p>
              </div>
            </div>

          </div>

          <hr className="my-6" />

          <hr className="my-6" /> 
          <BlogGallery postId={post.id} />



        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Post not found.</p>
        </div>
      )}
    </div>
  );
}
