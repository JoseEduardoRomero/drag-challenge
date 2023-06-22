import {useCallback, useMemo, useState, useEffect} from "react";
import Request from "../services/request";

const useMoveable =() =>{
    const [moveableComponents, setMoveableComponents] = useState([]);
    const [selected, setSelected] = useState(null);
    const [allImages, setAllImages] = useState([]);

    const imageRequest = useMemo(() => new Request("https://jsonplaceholder.typicode.com"), []);

    /**
     * @function addMoveable - Function to add a new moveable component to the list of moveable components.
     */
    const addMoveable = () => {
        // Define an array of colors for the moveable components
        const COLORS = ["red", "blue", "yellow", "green", "purple"];

        // Generate a random index to select an image from the `allImages` array
        const randomIndex = Math.floor(Math.random() * allImages.length);

        // Get the URL of the randomly selected image
        const image = allImages[randomIndex].url;

        // Create a copy of the `moveableComponents` array for immutability
        const copyMoveables = moveableComponents.slice();

        // Create a new moveable component object and add it to the copied array
        copyMoveables.push({
            id: Math.floor(Math.random() * Date.now()), // Generate a unique ID for the component
            top: 0, // Initial top position
            left: 0, // Initial left position
            width: 100, // Initial width
            height: 100, // Initial height
            color: COLORS[Math.floor(Math.random() * COLORS.length)], // Randomly select a color from the COLORS array
            image: image, // Assign the randomly selected image URL
            updateEnd: true, // Flag to indicate if the component update has ended
        });

        // Update the state with the new array of moveable components
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
        const [handlePosX] = e.direction;
    //handlePosY
        if (handlePosX === -1) {
            // const initialLeft = e.left;
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

    const handleSelected = useCallback((id) => {
        setSelected(id)
    },[])

    useEffect(()=>{
        const onGetImages =  () =>{
            imageRequest.getData("photos").then((response) => {
                setAllImages(response)
            });
        }
        onGetImages()
    },[imageRequest])

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