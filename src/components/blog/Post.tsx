import { Link } from 'gatsby'
import React from 'react'
import './Post.css'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Post({ post }: { post: any }) {
  const lang = location?.pathname.startsWith("/fr/") ? "fr" : "en";
  return (
    <Link to={`/blog/${post.slug}?lang=${lang}`} key={post.id} className="col-span-1 flex flex-col justify-between gap-4 bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 hover-scale">
      <section>
        {post?.image ? <img src={`${process.env.GATSBY_API_URL}${post?.image}`} alt={post.title_en || post.title_fr} className="w-full h-36 object-cover rounded-md"></img> : ""}
        <div className='font-bold'>{post.title_en}</div>
        <div className='font-bold'>{post.title_fr}</div>
        <p className='text-gray-600 '>
          {post.summary_en || post.summary_fr}
        </p>
      </section>

      <section className='flex justify-between items-center'>
        <div><a href="" className="text-primary inline-block">Read More <ArrowRightIcon className='h-4 w-4' /> </a></div>
        <div className='text-sm flex items-center posts-center gap-2'>
          <span className='font-semibold text-gray-500'>languages available:</span>
          {post.title_en && <div className='bg-gray-600 text-white font-bold p-1 rounded'>en</div>}
          {post.title_fr && <div className='bg-gray-600 text-white font-bold p-1 rounded'>ar</div>}
        </div>
      </section>
    </Link>
  )
}
