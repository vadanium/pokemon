/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import pokeBg from '../assets/img/poke-bg.png'

const menu = {
    padding: 10,
    fontSize: 34,
    'a': {
        display: 'block',
        backgroundColor: '#47cfaf',
        margin: 5,
        padding: '15px 30px',
        borderRadius: 8,
        color: '#fff',
        fontWeight: 700,
        '&:hover': {
            backgroundColor: '#32b092'
        }
    }
}

export default function Home() {
    return (
        <>
            <div css={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, backgroundImage: `url(${pokeBg})`, backgroundSize: 400, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat' }}>
                <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                    <ul>
                        <li css={menu}>
                            <Link to="/pokemon">Pokemon List</Link>
                        </li>
                        <li css={menu}>
                            <Link to="/my-pokemon">My Pokemon</Link>
                        </li>
                        <li css={menu}>
                            <Link to="/credit">Credit</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
