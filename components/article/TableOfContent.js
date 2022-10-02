import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

const TableOfContent = ({ thisArticle }) => {
    const [headings, setHeadings] = useState([])
    const [activeId, setActiveId] = useState('')
    const router = useRouter()
    const observer = useRef()

    useEffect(() => {
        const elements = Array.from(thisArticle.sections)
            .map((elem) => ({
                header: elem.header,
                id: "g" + elem.id
            }))

        setHeadings(elements)


    }, [router.asPath])

    useEffect(() => {
        const handleObsever = (entries) => {
            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    setActiveId(entry.target.id)
                }
            })
        }

        observer.current = new IntersectionObserver(handleObsever, {
            root: null,
            rootMargin: "0px 0px -90% 0px",

        })

        const elements = document.querySelectorAll("h2")
        elements.forEach((elem) => observer.current.observe(elem))
        return () => observer.current?.disconnect()

    }, [])

    return (
        <ul className={`table-of-content hidden md:flex flex-col items-center sticky h-full top-16 left-0 mt-5 mb-12 mr-4 `}>
            {headings.map((heading) =>
                <li key={heading.id} className="shadow-none bg-none m-0 p-0 w-full min-h-0 rounded-none">
                    <a href={`${heading.id}`}
                        className={`${activeId === heading.id ? "text-cyan-600 border-sky-500" : "text-black"}
                              hover:text-cyan-600 hover:no-underline  !m-0  w-full 
                             text-xs border-r-2 pl-1 block `}
                        onClick={(e) => {
                            e.preventDefault()
                            const element = document.getElementById(heading.id);
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            })
                        }}>
                        <span className='py-2 px-4 block'>{heading.header}</span>
                    </a>
                </li>
            )}
        </ul>
    )
}

export default TableOfContent