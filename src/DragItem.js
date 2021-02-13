import React, { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {setDragging} from './GlobalState';

function handleThis(){
  setDragging(true)
}

const DragItem = memo(({ id, onMoveItem, children }) => {
  const ref = useRef(null);
  setDragging(false)

  const [{ isDragging }, connectDrag] = useDrag({
    item: { id, type: "IMG" },
    end: (dropResult, monitor) => {
      
      const { id: droppedId, originalIndex } = monitor.getItem()
      const didDrop = monitor.didDrop()
      if (didDrop) {
        handleThis();
      }else{
        setDragging(false)

      }
    },
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      };
      
    }
  });

  const [, connectDrop] = useDrop({
    accept: "IMG",
    
    hover(hoveredOverItem) {
      if (hoveredOverItem.id !== id) {
        onMoveItem(hoveredOverItem.id, id);
      }
    }

  }
  );

  // const [, chk] = useDrop({
  //   accept: "IMG",
    
  //  drop(target){

  //  }
  // }
  // );
  connectDrag(ref);
  connectDrop(ref);

  const opacity = isDragging ? 0.5 : 1;
  const containerStyle = { opacity };

  return React.Children.map(children, child =>
    React.cloneElement(child, {
      forwardedRef: ref,
      style: containerStyle
    })
    
  );

});

export default DragItem;
