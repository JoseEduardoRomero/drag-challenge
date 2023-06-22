import {useCallback, useMemo, useState, useEffect} from "react";
import Request from "../services/request";

const useMoveable =() =>{
    const [moveableComponents, setMoveableComponents] = useState([]);
    const [selected, setSelected] = useState(null);
    const [allImages, setAllImages] = useState([]);

    const imageRequest = useMemo(() => new Request("https://jsonplaceholder.typicode.com"), []);

    const addMoveable = () => {
        const COLORS = ["red", "blue", "yellow", "green", "purple"];
        const randomIndex = Math.floor(Math.random() * allImages.length);
        const image = allImages[randomIndex].url;
        const copyMoveables = moveableComponents.slice();
        copyMoveables.push({
            id: Math.floor(Math.random() * Date.now()),
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            image: image,
            updateEnd: true,
        });
        setMoveableComponents(copyMoveables);
    };

    const updateMoveable = (id, newComponent, updateEnd = false) => {
        const updatedMoveables = moveableComponents.map((moveable, i) => {
            if (moveable.id === id) {
                // Verificar límites del componente dentro del contenedor padre
                const parentBounds = document.getElementById("parent").getBoundingClientRect();
                const { top, left, width, height, color, image } = newComponent;

                let updatedTop = top;
                let updatedLeft = left;
                let updatedWidth = width;
                let updatedHeight = height;

                if (top < 0) {
                    updatedTop = 0;
                }

                if (left < 0) {
                    updatedLeft = 0;
                }

                if (top + height > parentBounds.height) {
                    updatedHeight = parentBounds.height - top;
                }

                if (left + width > parentBounds.width) {
                    updatedWidth = parentBounds.width - left;
                }

                return { id, top: updatedTop, left: updatedLeft, width: updatedWidth, height: updatedHeight, color, updateEnd, image };
            }
            return moveable;
        });
        setMoveableComponents(updatedMoveables);
    };

    const handleResizeStart = (index, e) => {
        const [handlePosX, handlePosY] = e.direction;

        if (handlePosX === -1) {
            const initialLeft = e.left;
            const initialWidth = e.width;

            // Set up the onResize event handler to update the left value based on the change in width
            e.onResize = ({ target, width }) => {
                const moveableElement = target.closest(".draggable");
                const parentElement = document.getElementById("parent");
                const parentBounds = parentElement.getBoundingClientRect();
                const leftOffset = moveableElement.offsetLeft;

                const newLeft = leftOffset + (width - initialWidth);
                const maxLeft = parentBounds.width - moveableElement.offsetWidth;

                if (newLeft < 0) {
                    moveableElement.style.left = "0px";
                } else if (newLeft > maxLeft) {
                    moveableElement.style.left = maxLeft + "px";
                } else {
                    moveableElement.style.left = newLeft + "px";
                }
            };
        }
    };

    const deleteMoveable = (id) => {
        const updatedMoveables = moveableComponents.filter(
            (moveable) => moveable.id !== id
        );
        setMoveableComponents(updatedMoveables);
    };

    const onGetImages =  async () =>{
        const images = await imageRequest.getData("photos");
        setAllImages(images);
    }

    const handleSelected = useCallback((id) => {
        setSelected(id)
    },[])

    useEffect(()=>{
        onGetImages()
    },[])

    return{
        moveableComponents,
        selected,

        addMoveable,
        updateMoveable,
        handleResizeStart,
        handleSelected,
        deleteMoveable
    }
}

export default useMoveable;