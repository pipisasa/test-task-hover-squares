import { useCallback, useEffect, useState } from "react";

export interface Pos {
  x: number;
  y: number;
}

export type AreaMapToggleFunc = (x:number, y:number)=>boolean

export class AreaCell{
  #state: boolean;
  #pos: Pos;
  constructor(pos: Pos, state: boolean = false){
    this.#state = state;
    this.#pos = pos;
  }
  toggle():boolean{
    this.#state = !this.#state;
    return this.#state;
  }
  get state(){
    return this.#state;
  }
  get pos():Pos{
    return this.#pos;
  }
}

export class AreaMap{
  #map: Array<Array<AreaCell>>;
  readonly size: number;
  constructor(size: number, map?:Array<Array<AreaCell>>){
    this.size = size;
    if(map){
      this.#map = map;
    }else{
      this.#map = [];
      for(let i=0; i<size; i++){
        this.#map.push([]);
        for(let k=0; k<size; k++){
          this.#map[i].push(new AreaCell({ x: k, y: i }));
        }
      }
    }
  }
  static copy(area: AreaMap,){
    return new AreaMap(area.size, area.map);
  }
  get map():Array<Array<AreaCell>>{
    return this.#map;
  }
  toggleCell(x: number, y: number){
    return this.#map[y][x].toggle()
  }
}

interface UseAreaResult{
  map: AreaMap, 
  toggleCell: AreaMapToggleFunc
}

function useArea(size: number): UseAreaResult {
  const [map, setMap] = useState<AreaMap>(new AreaMap(size));

  useEffect(() => {
    setMap(new AreaMap(size));
  }, [size, setMap]);

  const toggleCell = useCallback((x, y)=>{
    const newMap = AreaMap.copy(map);
    setMap(newMap);
    return newMap.toggleCell(x, y);
  }, [map]);

  return {
    map,
    toggleCell,
  }
}

export default useArea;