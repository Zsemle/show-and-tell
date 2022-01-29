import React from 'react';
import Axios, { AxiosError, AxiosResponse } from 'axios'
import './DemoApp.css';

interface DemoAppState {
  error: Error | AxiosError |null
  isLoaded: Boolean
  carBrands: any[] | null
}

class DemoApp extends React.Component<{},DemoAppState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      carBrands: null
    };

    this.fetchCarBrands = this.fetchCarBrands.bind(this)
  }

  private fetchCarBrands(): void{
    Axios.get('http://localhost:3001/carbrands')
    .then(
      (response:AxiosResponse) => {
         this.setState({
          isLoaded: true,
          carBrands: response.data
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }

  componentDidMount(): void {
    this.fetchCarBrands()
  }

  render ():JSX.Element {
    const {carBrands} = this.state

    return (
      <div className="demo-app">
        <ul>
        {carBrands?.map(carBrand => <li>{carBrand.displayName}</li>)}
        </ul>
      </div>
    );
    }
}

export default DemoApp;
