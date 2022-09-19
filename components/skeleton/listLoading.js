import React from 'react'
import ContentLoader from 'react-content-loader'

const ListLoading = props => {
    return (
        <ContentLoader
            uniqueKey="my-random-value"
            speed={1}
            viewBox="0 0 450 540"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="350" y="0" rx="4" ry="4" width="100" height="100" />
            <rect x="180" y="20" rx="0" ry="0" width="150" height="11" />
            <rect x="25" y="60" rx="0" ry="0" width="15" height="15" />
            <rect x="50" y="60" rx="0" ry="0" width="15" height="15" />
            <rect x="0" y="100" rx="0" ry="0" width="450" height="2" />

            <rect x="350" y="120" rx="4" ry="4" width="100" height="100" />
            <rect x="180" y="140" rx="0" ry="0" width="150" height="11" />
            <rect x="25" y="180" rx="0" ry="0" width="15" height="15" />
            <rect x="50" y="180" rx="0" ry="0" width="15" height="15" />
            <rect x="0" y="220" rx="0" ry="0" width="450" height="2" />

            <rect x="350" y="240" rx="4" ry="4" width="100" height="100" />
            <rect x="180" y="260" rx="0" ry="0" width="150" height="11" />
            <rect x="25" y="300" rx="0" ry="0" width="15" height="15" />
            <rect x="50" y="300" rx="0" ry="0" width="15" height="15" />
            <rect x="0" y="340" rx="0" ry="0" width="450" height="2" />

            <rect x="350" y="360" rx="4" ry="4" width="150" height="100" />
            <rect x="180" y="380" rx="0" ry="0" width="150" height="11" />
            <rect x="25" y="420" rx="0" ry="0" width="15" height="15" />
            <rect x="50" y="420" rx="0" ry="0" width="15" height="15" />
            <rect x="0" y="460" rx="0" ry="0" width="450" height="2" />
        </ContentLoader>
    )
}

export default ListLoading