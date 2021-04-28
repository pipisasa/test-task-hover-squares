import { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../../helpers/constants/apiUrl'
import Fallback from '../Fallback/Fallback';
import ErrorView from '../ErrorView/ErrorView';
import Area from '../Area/Area';
import Select from 'react-select';

import './Game.css';

enum GameMode {
  easyMode="easyMode",
  normalMode="normalMode",
  hardMode="hardMode",
}

interface AppModes {
  easyMode: {
    field: number;
  },
  normalMode: {
    field: number;
  },
  hardMode: {
    field: number;
  }
}


interface IGameProps {
}

interface IGameState {
  appModes: null | AppModes,
  currentMode: GameMode | null,
  error: any,
  history: Array<{x: number, y: number}>
}

export class Game extends Component<IGameProps, IGameState> {

  constructor(props: IGameProps){
    super(props)
    this.state = {
      appModes: null,
      currentMode: null,
      error: null,
      history: []
    };
  }

  fetchAppMode = async ()=>{
    try {
      const {data} = await axios.get<AppModes>(API_URL);
      this.setState({
        appModes: data
      });
    } catch (error) {
      this.setState({error});
    }
  }

  componentDidMount(){
    this.fetchAppMode();
  }
  componentDidUpdate(_: IGameProps, prevState: IGameState){
    if(prevState.currentMode !== this.state.currentMode){
      this.setState({ history: [] });
    }
  }

  readonly selectOptions: ReadonlyArray<{value: string, label: string}> = [
    {value: GameMode.easyMode, label: "Easy"},
    {value: GameMode.normalMode, label: "Normal"},
    {value: GameMode.hardMode, label: "Hard"},
  ]

  handleSelectChange = (option:any)=>{
    this.setState({
      currentMode: option?.value || null,
    });
  }

  handleHover = (x: number, y: number)=>{
    this.state.history.push({x,y});
    this.setState({});
  }

  render() {
    const { appModes, currentMode, error } = this.state;
    if(!this.state.appModes) return <Fallback/>;
    if(error) return <ErrorView error={error}/>;
    return (
      <div className="game">
        <div className="game__left">
        <div className="app_mode">
          <p className="app_mode__header">App mode:</p>
          <Select
            placeholder="Select app mode..."
            className="app_mode__select"
            options={this.selectOptions}
            onChange={this.handleSelectChange}
          />
        </div>
        {!!currentMode && <Area handleHover={this.handleHover} size={appModes?.[currentMode].field}/>}
        </div>
        <div className="game__right game_history">
          <h3 className="game_history__header">Hover Squares</h3>
          <ul className="game_history__list">
            {this.state.history.map(({x, y}, i)=>(
              <li 
                className="game_history__item"
                key={`game_history__item-${i}`}
              >
                {`Row ${y} Col ${x}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Game
