import React from 'react';
import { Box } from '@mui/material';
import BodyPartCard from './BodyPartCard';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import finalLeft from '../assets/icons/final-left-arrow.png'
import './Scrollmenu.css';
import finalRight from '../assets/icons/final-right-arrow.png';

export default function BodyPartsScrollbar({ data, selectedBodyPart, setSelectedBodyPart }) {

    function LeftArrow() {
        const { isFirstItemVisible, scrollPrev } =
            React.useContext(VisibilityContext);

        return (
            <div disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
                <img src={finalLeft} className='arrow' />
            </div>
        );
    }


    function RightArrow() {
        const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

        return (
            <div disabled={isLastItemVisible} onClick={() => scrollNext()}>
                <img src={finalRight} className='arrow' />
            </div>
        );
    }

    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {data.map((item) => (
                <div className='item'
                    key={item.id || item}
                    itemId={item.id || item}
                    title={item.id || item} >
                    <BodyPartCard item={item} selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
                </div>
            ))}
        </ScrollMenu>
    )
}