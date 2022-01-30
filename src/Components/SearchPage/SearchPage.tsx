import React from 'react';
import Axios, { AxiosError, AxiosResponse } from 'axios'
import './SearchPage.css'
import { CarBrand, CarModel } from '../../types/demoAppModels';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SearchPageState {
  error: Error | AxiosError |null
  brandsLoading: Boolean
  modelsLoading: Boolean
  carBrands: CarBrand[] | null
  carModels: CarModel[] | null
  selectedCarBrand: string | null
  selectedCarModel: string | null
}

class SearchPage extends React.Component<{},SearchPageState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      brandsLoading: true,
      modelsLoading: false,
      carBrands: null,
      carModels: null,
      selectedCarBrand: '',
      selectedCarModel: ''
    };

    this.fetchCarBrands = this.fetchCarBrands.bind(this)
    this.fetchCarModels = this.fetchCarModels.bind(this)
    this.handleCarBrandChange = this.handleCarBrandChange.bind(this)
    this.handleCarModelChange = this.handleCarModelChange.bind(this)
  }

  private fetchCarBrands(): void{
    Axios.get('http://localhost:3001/carbrands')
    .then(
      (response:AxiosResponse) => {
        const carBrands = response.data.map((brandData:any) => new CarBrand(brandData))
         this.setState({
          brandsLoading: false,
          carBrands: carBrands
        })
      },
      (error) => {
        this.setState({
          brandsLoading: false,
          error
        })
      }
    )
  }

  private fetchCarModels(id:string | null): void{
    Axios.get(`http://localhost:3001/modelsofcarbrand/${id}`)
    .then(
      (response:AxiosResponse) => {
        const carModels = response.data.map((carModelData:any) => new CarModel(carModelData))
         this.setState({
          modelsLoading: false,
          carModels: carModels
        })
      },
      (error) => {
        this.setState({
          modelsLoading: false,
          error
        })
      }
    )
  }

  componentDidMount(): void {
    this.fetchCarBrands()
  }

  private handleCarBrandChange(event:SelectChangeEvent<string | null>) {
    const newState = {
      selectedCarBrand: event.target.value,
      selectedCarModel: ''
    }
    this.setState(
      newState,
      event.target.value ? () => this.fetchCarModels(event.target.value) : undefined
      )
  }

  private handleCarModelChange(event:SelectChangeEvent<string | null>) {
    this.setState({
      selectedCarModel: event.target.value
    })
  }

  render ():JSX.Element {
    const {
      carBrands,
      carModels,
      selectedCarBrand,
      selectedCarModel
    } = this.state

    return (
      <div className="demo-app">
        <h1>Buy a car</h1>
        <FormControl fullWidth>
          <InputLabel id="car-brand-label">Brand</InputLabel>
          <Select
            labelId="car-brand-label"
            id="select-brand"
            value={selectedCarBrand}
            label="Car Brand"
            onChange={this.handleCarBrandChange}
          >
            {selectedCarBrand && <MenuItem value=''>None</MenuItem>}
            {carBrands?.map((carBrand,index) => (
                <MenuItem key={index} value={carBrand.id}>{carBrand.displayName}</MenuItem>
              )
            )}
          </Select>
        </FormControl> 
        <FormControl fullWidth>
          <InputLabel id="car-model-label">Model</InputLabel>
          <Select
            labelId="dcar-model-label"
            id="select-model"
            value={selectedCarModel}
            label="Car Brand"
            onChange={this.handleCarModelChange}
            disabled={!carBrands}
          >
            {carBrands
            ? <MenuItem value=''>All models</MenuItem>
            : <MenuItem value=''>Select a car brand first</MenuItem>}
            
            {carModels?.map((carModel,index) => (
                <MenuItem key={index} value={carModel.id}>{carModel.displayName}</MenuItem>
              )
            )}
          </Select>
        </FormControl> 
     </div>
    );
    }
}

export default SearchPage;
