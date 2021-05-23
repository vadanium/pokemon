/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import PropTypes from 'prop-types'

function Tabs(props) {
    const { color, children } = props;
    const tab = ! children[0] ? [ children ] : children;

    const [ activeTab, setActiveTab ] = useState({
        tabNumber: 1,
        label: tab[0] ? tab[0].props.label : tab.props.label
    });

    const baseColor = color ? color : '#fb6c6c'

    const btnStyle = {
        flex: '1 0 0%',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '15px',
        cursor: 'pointer',
        position: 'relative',
        textAlign: 'center',
        fontFamily: 'inherit',
        color: 'inherit',
        fontSize: 18,
        '&.active': {
            fontWeight: 700,
        }
    }

    const indicatorStyle = {
        position: 'absolute',
        bottom: '-1px',
        left: `${activeTab.tabNumber !== 1 ? 100 / tab.length * (activeTab.tabNumber - 1) : 0}%`,
        width: `${100 / tab.length}%`,
        height: 0,
        borderBottom: `2px solid ${baseColor}`,
        transition: 'left .3s ease-in-out'
    }

    return (
        <div>
            <div className="container">
                <div css={{
                    display: 'flex',
                    position: 'relative',
                    borderBottom: '1px solid #f1f1f1'
                }}>
                    {tab.map((item, i) => (
                        <button key={ i } css={ btnStyle } className={ activeTab.label === item.props.label && 'active' } onClick={ () => setActiveTab({ tabNumber: i+1, label: item.props.label }) }>{  item.props.label ? item.props.label : 'undefined' }</button>
                    ))}

                    <div css={ indicatorStyle }></div>
                </div>
            </div>

            <div>
                {tab.map((item, i) => {
                    if(item.props.label !== activeTab.label) return undefined;

                    return (
                        <div className="container" key={ i }>
                            { item.props.children }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

Tabs.propTypes = {
    children: PropTypes.array.isRequired
};

export default Tabs