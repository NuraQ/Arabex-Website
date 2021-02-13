import React, { useContext } from "react";
import DragItem from "./DragItem";
import { Grid, GridImage, GridItem } from "./Grid";
import GridContext from "./GridContext"; import { contact } from './Update';
import { useHistory } from "react-router-dom";
import './dnd.css'

function passData(item,history) {
  history.push({
    pathname: "/UpdateElement",
    state:{element:item}
    
  })
}

function DND() {
  let history = useHistory();
  const { items, moveItem } = useContext(GridContext);
  return (
    <div >
      <Grid>
        {items.map(item => (
          <DragItem key={item.id} id={item.id} onMoveItem={moveItem}>
            <GridItem>
              <GridImage src={encodeURI("http://127.0.0.1:9999/load_image/?img=" + `${item.image}` + "&&type=" + `${item.category_id}`)}>
                <button className="btnInfo" onClick = {()=>passData(item,history)}  >{item.name}</button>
              </GridImage>
            </GridItem>
          </DragItem>
        ))}
      </Grid>
    </div>
  );
}

export default DND;
