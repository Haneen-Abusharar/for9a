import React from 'react'
import ContentLoader from 'react-content-loader'

const ListLoading = props => {
    return (
        <ContentLoader
            speed={1}
            viewBox="0 0 450 520"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="300" y="0" rx="4" ry="4" width="150" height="150" />
            <rect x="100" y="20" rx="0" ry="0" width="150" height="11" />
            <rect x="60" y="50" rx="0" ry="0" width="190" height="11" />
            <rect x="60" y="80" rx="0" ry="0" width="190" height="11" />
            <rect x="25" y="130" rx="0" ry="0" width="15" height="15" />
            <rect x="5" y="130" rx="0" ry="0" width="15" height="15" />
            <rect x="0" y="150" rx="0" ry="0" width="450" height="2" />

            <rect x="300" y="180" rx="4" ry="4" width="150" height="150" />
            <rect x="100" y="200" rx="0" ry="0" width="150" height="11" />
            <rect x="60" y="230" rx="0" ry="0" width="190" height="11" />
            <rect x="60" y="260" rx="0" ry="0" width="190" height="11" />
            <rect x="25" y="310" rx="0" ry="0" width="15" height="15" />
            <rect x="5" y="310" rx="0" ry="0" width="15" height="15" />
            <rect x="0" y="330" rx="0" ry="0" width="450" height="2" />

            <rect x="300" y="360" rx="4" ry="4" width="150" height="150" />
            <rect x="100" y="380" rx="0" ry="0" width="150" height="11" />
            <rect x="60" y="410" rx="0" ry="0" width="190" height="11" />
            <rect x="60" y="440" rx="0" ry="0" width="190" height="11" />
            <rect x="25" y="490" rx="0" ry="0" width="15" height="15" />
            <rect x="5" y="490" rx="0" ry="0" width="15" height="15" />
            <rect x="0" y="510" rx="0" ry="0" width="450" height="2" />
        </ContentLoader>
    )
}



export default ListLoading