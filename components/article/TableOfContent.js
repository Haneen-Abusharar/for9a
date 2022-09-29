import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
const TableOfContent = ({ thisArticle }) => {
    const [headings, setHeadings] = useState([])
    const [activeId, setActiveId] = useState('')
    const router = useRouter()

    useEffect(() => {
        const elements = Array.from(thisArticle.sections)
            .map((elem) => ({
                header: elem.header,
                id: "g" + elem.id
            }))

        setHeadings(elements)
        
    },[router.asPath])

    function click(e) {
        e.preventDefault();
        this.classList.add("clicked")

    }
    useEffect(()=>{
        const els = document.getElementById(headings.map((heading) => heading.id))
        console.log(headings.map((heading) => heading.id))
        headings.map((heading) => {document.getElementById(heading.id)
            heading.addEventListener("click", click, false)
        })
       // els.map(element => element.addEventListener("click", click, false))
    },[])

    return (
        <div className={`table-of-content hidden md:flex flex-col items-center sticky h-full top-16 left-0 mt-4 mb-12`}>
            <ul className={`table-of-content columns-1 my-2 mx-0 p-1 text-base rounded`}>
                {headings.map((heading) =>
                    <li key={heading.id}>
                        <a className={(activeId === heading.id) ? "text-black" : ""}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault()
                                const element =
                                    //document.querySelector(`#${heading.id}`)
                                    document.getElementById(heading.id);
                                element.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                })
                            }}> {heading.header}</a>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default TableOfContent