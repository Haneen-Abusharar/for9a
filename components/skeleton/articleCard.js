import React from 'react'
import ContentLoader from 'react-content-loader'

const ArticleCardLoad = () => (
    <ContentLoader
        // uniqueKey='2nou0as-aria'
        speed={1}
        viewBox="0 0 450 540"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
       >
        <rect x="0" y="0" rx="4" ry="4" width="450" height="300" />
        <rect x="350" y="320" rx="4" ry="4" width="80" height="20" />
        <rect x="240" y="320" rx="4" ry="4" width="80" height='20' />
        <rect x="130" y="400" rx="0" ry="0" width="300" height="10" />
        <rect x="230" y="370" rx="0" ry="0" width="192" height="10" />
        <circle cx="400" cy="490" r="24" />
        <rect x="300" y="480" rx="0" ry="0" width="70" height="9" />
        <rect x="300" y="500" rx="0" ry="0" width="70" height="9" />
        <rect x="10" y="500" rx="0" ry="0" width="15" height="15" />
        <rect x="30" y="500" rx="0" ry="0" width="15" height="15" />
        <rect x="0" y="536" rx="0" ry="0" width="450" height="2" />
    </ContentLoader>
)

export default ArticleCardLoad