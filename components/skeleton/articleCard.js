import React from 'react'
import ContentLoader from 'react-content-loader'

const ArticleCardLoad = props => {
    return (
        <ContentLoader
            speed={1}
            viewBox="0 0 450 520"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props} >
            <rect x="0" y="0" rx="4" ry="4" width="450" height="200" />
            <rect x="380" y="220" rx="0" ry="0" width="50" height="11" />
            <rect x="290" y="220" rx="0" ry="0" width="50" height='11' />
            <rect x="171" y="80" rx="0" ry="0" width="20" height="20" />

            <rect x="130" y="270" rx="0" ry="0" width="300" height="10" />
            <rect x="230" y="310" rx="0" ry="0" width="192" height="10" />
            <circle cx="400" cy="450" r="24" />
            <rect x="300" y="440" rx="0" ry="0" width="70" height="9" />
            <rect x="300" y="455" rx="0" ry="0" width="70" height="9" />
            <rect x="10" y="455" rx="0" ry="0" width="15" height="15" />
            <rect x="30" y="455" rx="0" ry="0" width="15" height="15" />
            <rect x="0" y="500" rx="0" ry="0" width="450" height="2" />
        </ContentLoader>
    )
}



export default ArticleCardLoad