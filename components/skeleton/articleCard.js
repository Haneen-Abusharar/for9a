import React from 'react'
import ContentLoader from 'react-content-loader'

const ArticleCardLoad = props => {
    return (
        <ContentLoader
            speed={1}
          width={"500px"}
           
            viewBox="0 0 450 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="171" y="53" rx="0" ry="0" width="316" height="100" />
            <rect x="330" y="160" rx="0" ry="0" width="50" height="11" />
            <rect x="260" y="160" rx="0" ry="0" width="50" height='11' />
            <rect x="171" y="60" rx="0" ry="0" width="20" height="20" />
            <rect x="171" y="353" rx="0" ry="0" width="316" height="2" />
            <rect x="174" y="53" rx="0" ry="0" width="316" height="41" />
            <rect x="230" y="207" rx="0" ry="0" width="200" height="9" />
            <rect x="340" y="236" rx="0" ry="0" width="92" height="9" />
            <circle cx="400" cy="320" r="24" />
            <rect x="300" y="310" rx="0" ry="0" width="50" height="9" />
            <rect x="300" y="325" rx="0" ry="0" width="50" height="9" />
            <rect x="200" y="315" rx="0" ry="0" width="15" height="15" />
            <rect x="180" y="315" rx="0" ry="0" width="15" height="15" />
        </ContentLoader>
    )
}



export default ArticleCardLoad