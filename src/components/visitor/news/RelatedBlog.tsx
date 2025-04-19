import Line from '@/components/atoms/Line'
import React from 'react'



import CardRelatedBlog from './CardRelatedBlog'
import HeaderSection from './HeaderSection'
import { Link } from 'gatsby'

export default function RelatedBlog({ headerName, relatedBlog, route }: { headerName: string, relatedBlog: any, route: string }) {
    return (
        <div>
            <HeaderSection headerName={headerName} />

            <div className="divide-y divide-black w-full text-start max-w-[300px]">
                {relatedBlog.map((blog: any, index: number) => (
                    <Link to={route +  blog.slug}   >

                        <CardRelatedBlog
                            key={index}
                            imgSrc={blog.image}
                            title={blog.title_en || blog.title_fr}
                            date={`Le ${new Date(blog.created_at).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}`}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}
