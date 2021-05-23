/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react'

/**
 * 
 * @param {width, height} props width & height in px, default value = 100px
 * @returns 
 */
export default function LoadingBox(props) {
    const boxWidth = props.width || 100
    const boxHeight = props.height || 100
    const animationLoading = keyframes`
            0% {
                width: 0%
            }
            100% {
                width: 100%
            }
        `
    return (
        <div css={{
            position: 'relative',
            width: boxWidth+'px',
            height: boxHeight+'px',
            backgroundColor: '#f2f2f2',
            borderRadius: 5,
            overflow: 'hidden',
            '&::before': {
                content: '""',
                width: '0%',
                height: '100%',
                position: 'absolute',
                backgroundColor: '#ebebeb',
                animation: `${ animationLoading } .8s ease-in-out infinite`
            }
        }}></div>
    )
}
