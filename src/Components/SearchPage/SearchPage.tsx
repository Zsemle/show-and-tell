import React from 'react';
import Axios, { AxiosError, AxiosResponse } from 'axios'
import './SearchPage.css'
import { CarBrand, CarModel } from '../../types/demoAppModels';

interface SearchPageState {
  error: Error | AxiosError |null
  isLoaded: Boolean
  carBrands: CarBrand[] | null
  carModels: CarModel[] | null
}

class SearchPage extends React.Component<{},SearchPageState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      carBrands: null,
      carModels: null
    };

    this.fetchCarBrands = this.fetchCarBrands.bind(this)
    this.fetchCarModels = this.fetchCarModels.bind(this)
  }

  private fetchCarBrands(): void{
    Axios.get('http://localhost:3001/carbrands')
    .then(
      (response:AxiosResponse) => {
        const carBrands = response.data.map((brandData:any) => new CarBrand(brandData))
         this.setState({
          isLoaded: true,
          carBrands: carBrands
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

  private fetchCarModels(id:string): void{
    Axios.get(`http://localhost:3001/modelsofcarbrand/${id}`)
    .then(
      (response:AxiosResponse) => {
        const carModels = response.data.map((carModelData:any) => new CarModel(carModelData))
         this.setState({
          isLoaded: true,
          carModels: carModels
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
    this.fetchCarModels('kkkll3')
  }

  render ():JSX.Element {
    const {carBrands,carModels} = this.state

    return (
      <div className="demo-app">
        <h2>Car brands dropdown</h2>
        <ul>
        {carBrands?.map((carBrand,index) => <li key={index}>{carBrand.displayName}</li>)}
        </ul>
        <h2>Car models dropdown</h2>
        <ul>
        {carModels?.map((carModel,index) => <li key={index}>{carModel.displayName}</li>)}
        </ul>
      </div>
    );
    }
}

export default SearchPage;
