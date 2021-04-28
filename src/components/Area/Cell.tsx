import React from 'react'
import { AreaCell, AreaMapToggleFunc } from '../../helpers/utils/useArea';
import classNames from 'classnames';

interface ICellProps{
  cell: AreaCell,
  toggleCell: AreaMapToggleFunc,
}

const Cell:React.FunctionComponent<ICellProps> = ({
  cell,
  toggleCell
}) => {
  const toggle = ()=>toggleCell(cell.pos.x, cell.pos.y);
  return (
    <div 
      className={classNames("area__cell", { active: cell.state })}
      onMouseEnter={toggle}
    />
  );
}

export default Cell
