import {useRef, useState} from "react";


const useBox = (args)=>{
    const {top, left, width, height, index, color, id, updateMoveable, image} = args;
    const [buttonTop, setButtonTop] = useState(0);
    const [buttonLeft, setButtonLeft] = useState(0);
    const ref = useRef();

    const [nodoReferencia, setNodoReferencia] = useState({
        top,
        left,
        width,
        height,
        index,
        color,
        id,
    });

    const parent = document.getElementById("parent");
    const parentBounds = parent?.getBoundingClientRect();

    const onResize = (e) => {
        // Update width and height
        let newWidth = e.width;
        let newHeight = e.height;

        // Ensure the component stays within the parent boundaries
        if (left + newWidth > parentBounds?.width) {
            newWidth = parentBounds?.width - left;
        }

        if (top + newHeight > parentBounds?.height) {
            newHeight = parentBounds?.height - top;
        }

        // Update moveable component with new dimensions
        updateMoveable(id, {
            top,
            left,
            width: newWidth,
            height: newHeight,
            color,
            image,
        });

        // Update reference node
        const beforeTranslate = e.drag.beforeTranslate;

        // Update CSS styles for width, height, and transform
        ref.current.style.width = `${e.width}px`;
        ref.current.style.height = `${e.height}px`;
        ref.current.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;

        // Update reference node state
        setNodoReferencia({
            ...nodoReferencia,
            translateX: beforeTranslate[0],
            translateY: beforeTranslate[1],
            top: top + beforeTranslate[1] < 0 ? 0 : top + beforeTranslate[1],
            left: left + beforeTranslate[0] < 0 ? 0 : left + beforeTranslate[0],
        });
    };

    const onResizeEnd = (e) => {
        let newWidth = e.lastEvent?.width;
        let newHeight = e.lastEvent?.height;

        // Ensure the component stays within the parent boundaries
        if (left + newWidth > parentBounds?.width) {
            newWidth = parentBounds?.width - left;
        }

        if (top + newHeight > parentBounds?.height) {
            newHeight = parentBounds?.height - top;
        }

        const absoluteTop = top + e.drag.beforeTranslate[1];
        const absoluteLeft = left + e.drag.beforeTranslate[0];

        // Update moveable component with final dimensions and position
        updateMoveable(id, {
            top: absoluteTop,
            left: absoluteLeft,
            width: newWidth,
            height: newHeight,
            color,
            image,
        }, true);

        // Update button position
        setButtonTop(absoluteTop - 10);
        setButtonLeft(absoluteLeft);
    };

    return{
        buttonTop,
        buttonLeft,
        ref,
        nodoReferencia,
        onResize,
        onResizeEnd

    }
}

export default useBox;