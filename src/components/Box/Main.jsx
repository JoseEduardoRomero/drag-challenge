import React from "react";
import Moveable from "react-moveable";
import useBox from "../../hooks/useBox";
import {Button} from "../ui";


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
        color,
        image,
        id,
        setSelected,
        isSelected = false,
        deleteMoveable,
    } = props;

    const {ref, buttonLeft, buttonTop, onResize, onResizeEnd} = useBox(props)

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
                        image
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
                <Button
                    onClick={() => deleteMoveable(id)}
                    styles={{
                        position: "absolute",
                        top: buttonTop,
                        left: buttonLeft,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px",
                        height: "45px",
                        borderRadius: "50% !important",
                        background: "#ff0000",
                        color: "#ffffff",
                        border: "none",
                        cursor: "pointer",
                    }}
                    text='X'
                />
            )}
        </>
    );
};

export default React.memo(Box);