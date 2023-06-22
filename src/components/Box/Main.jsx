import React, {useRef, useState} from "react";
import Moveable from "react-moveable";


/**
 * @function Box
 * @param {Object} props
 * @param {number} props.top - Top position of the box
 * @param {number} props.left - Left position of the box
 * @param {number} props.width - Width of the box
 * @param {number} props.height - Height of the box
 * @param {number} props.index - Index of the box
 * @param {string} props.color - Color of the box
 * @param {number} props.id - ID of the box
 * @param {Function} props.setSelected - Function to call when the box is selected
 * @param {boolean} props.isSelected - Whether or not the box is selected
 * @param {Function} props.updateEnd - Function to call when the box is updated
 * @param {Function} props.updateMoveable - Function to call when the box is updated
 * @returns {JSX.Element}
 * */

const Box = (props) => {
    const {
        updateMoveable,
        top,
        left,
        width,
        height,
        index,
        color,
        image,
        id,
        setSelected,
        isSelected = false,
        updateEnd,
        deleteMoveable,
    } = props;
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

    let parent = document.getElementById("parent");
    let parentBounds = parent?.getBoundingClientRect();

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

        updateMoveable(id, {
            top,
            left,
            width: newWidth,
            height: newHeight,
            color,
        });

        // Update reference node
        const beforeTranslate = e.drag.beforeTranslate;

        ref.current.style.width = `${e.width}px`;
        ref.current.style.height = `${e.height}px`;

        let translateX = beforeTranslate[0];
        let translateY = beforeTranslate[1];

        ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

        setNodoReferencia({
            ...nodoReferencia,
            translateX,
            translateY,
            top: top + translateY < 0 ? 0 : top + translateY,
            left: left + translateX < 0 ? 0 : left + translateX,
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

        const { lastEvent } = e;
        const { drag } = lastEvent;
        const { beforeTranslate } = drag;

        const absoluteTop = top + beforeTranslate[1];
        const absoluteLeft = left + beforeTranslate[0];

        updateMoveable(id, {
            top: absoluteTop,
            left: absoluteLeft,
            width: newWidth,
            height: newHeight,
            color,
            image,
        }, true);
    };

    return (
        <>
            <div
                ref={ref}
                className="draggable"
                id={"component-" + id}
                style={{
                    position: "absolute",
                    top: top,
                    left: left,
                    width: width,
                    height: height,
                    background: color,
                    backgroundImage: `url(${image})`,
                    backgroundSize: "auto",
                    backgroundPosition: "center",
                }}
                onClick={() => setSelected(id)}
            />
            <Moveable
                target={isSelected && ref.current}
                resizable
                draggable
                onDrag={(e) => {
                    updateMoveable(id, {
                        top: e.top,
                        left: e.left,
                        width,
                        height,
                        color,
                    });
                }}
                onResize={onResize}
                onResizeEnd={onResizeEnd}
                keepRatio={false}
                throttleResize={1}
                renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                edge={false}
                zoom={1}
                origin={false}
                padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
            />

            {isSelected && (
                <button
                    onClick={() => deleteMoveable(id)}
                    style={{ position: "absolute", top: top -10 , left:left  }}
                >
                    X
                </button>
            )}
        </>
    );
};

export default React.memo(Box);