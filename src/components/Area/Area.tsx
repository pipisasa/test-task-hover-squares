import React from 'react';
import useArea from '../../helpers/utils/useArea';
import Cell from './Cell';

import './Area.css';

// const createMap = (size) => Array(size).fill(Array(size).fill(false));

interface IAreaProps{
  size?: number;
  handleHover?: (x:number, y:number)=>void;
}

const Area: React.FunctionComponent<IAreaProps> = ({ size=0, handleHover }) => {
  const { map: area, toggleCell } = useArea(size);
  const handleToggle = (x: number, y:number)=>{
    if(handleHover)handleHover(x, y);
    return toggleCell(x, y);
  }
  return (
    <div className="area">
      {area.map.map((row, rowI)=>(
        <div 
          className="area__row" 
          key={`area-row-${rowI}`}
        >
          {row.map((cell, cellI)=>(
            <Cell 
              key={`area-row-${rowI}-cell-${cellI}`} 
              cell={cell} 
              toggleCell={handleToggle}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Area;