/** @jsxImportSource @emotion/react */

export default function Modal(props) {
    const { show, children } = props;

    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    
    return (
        <>
            {show === 1 &&
                <div css={ modalStyle }>
                    <div css={{
                        width: 500,
                        margin: 30,
                        padding: 30,
                        backgroundColor: '#fff',
                        borderRadius: 10
                    }}>
                        { children }
                    </div>
                    <div css={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.5)',
                        zIndex: -1
                    }}></div>
                </div>}
        </>
    )
}
