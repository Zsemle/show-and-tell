import React from 'react';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import './SearchPage.css';
import {
  Button, SelectChangeEvent,
} from '@mui/material';
import { CarBrand, CarModel } from '../../types/demoAppModels';
import CarBrandSelector from '../CarBrandSelector/CarBrandSelector';
import CarModelSelector from '../CarModelSelector/CarModelSelector';
import KeywordsField from '../KeywordsField/KeywordsField';

const T = {
  searchPanelTitle: 'Buy a car',
  searchButtonText: 'Search Cars',
};

interface SearchPageState {
  error: Error | AxiosError |null
  brandsLoading: Boolean
  modelsLoading: Boolean
  carBrands: CarBrand[] | null
  carModels: CarModel[] | null
  selectedCarBrand: string | null
  selectedCarModel: string | null
  keyWords: string[]
}

class SearchPage extends React.Component<{}, SearchPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      brandsLoading: true,
      modelsLoading: false,
      carBrands: null,
      carModels: null,
      selectedCarBrand: '',
      selectedCarModel: '',
      keyWords: [],
    };

    this.fetchCarBrands = this.fetchCarBrands.bind(this);
    this.fetchCarModels = this.fetchCarModels.bind(this);
    this.handleCarBrandChange = this.handleCarBrandChange.bind(this);
    this.handleCarModelChange = this.handleCarModelChange.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(): void {
    this.fetchCarBrands();
  }

  private handleCarBrandChange(event:SelectChangeEvent<string | null>) {
    const newState = {
      selectedCarBrand: event.target.value,
      selectedCarModel: '',
      carModels: null,
    };
    this.setState(
      newState,
      event.target.value ? () => this.fetchCarModels(event.target.value) : undefined,
    );
  }

  private handleCarModelChange(event:SelectChangeEvent<string | null>) {
    this.setState({
      selectedCarModel: event.target.value,
    });
  }

  private handleKeywordsChange(event:React.SyntheticEvent<Element, Event>, value: string[]) {
    this.setState({
      keyWords: value,
    });
  }

  private handleSubmit() {
    const {
      selectedCarBrand,
      selectedCarModel,
      keyWords,
    } = this.state;

    Axios.post('http://localhost:3001/seachCars', {
      selectedCarBrand,
      selectedCarModel,
      keyWords,
    })
      .then(
        (response:AxiosResponse) => {
          console.log(response);
        },
        (error) => {
          this.setState({
            modelsLoading: false,
            error,
          });
        },
      );
  }

  private fetchCarBrands(): void {
    Axios.get('http://localhost:3001/carbrands')
      .then(
        (response:AxiosResponse) => {
          const carBrands = response.data.map((brandData:any) => new CarBrand(brandData));
          this.setState({
            brandsLoading: false,
            carBrands,
          });
        },
        (error) => {
          this.setState({
            brandsLoading: false,
            error,
          });
        },
      );
  }

  private fetchCarModels(id:string | null): void {
    Axios.get(`http://localhost:3001/modelsofcarbrand/${id}`)
      .then(
        (response:AxiosResponse) => {
          const carModels = response.data.map((carModelData:any) => new CarModel(carModelData));
          this.setState({
            modelsLoading: false,
            carModels,
          });
        },
        (error) => {
          this.setState({
            modelsLoading: false,
            error,
          });
        },
      );
  }

  render():JSX.Element {
    const {
      carBrands,
      carModels,
      selectedCarBrand,
      selectedCarModel,
      keyWords,
      error,
      modelsLoading,
      brandsLoading,
    } = this.state;

    const recommendedKeywords = [
      'gti',
      'vsti',
      'AMG',
      'M-sport',
    ];

    return (
      <div className="search-page">
        <div className="search-panel">
          <h1>{T.searchPanelTitle}</h1>
          {modelsLoading && 'loading models'}
          {brandsLoading && 'loading brands'}
          {error && 'an error has occured'}
          <div className="seach-parameters">
            <CarBrandSelector
              carBrands={carBrands}
              selectedCarBrand={selectedCarBrand}
              onChange={this.handleCarBrandChange}
            />
            <CarModelSelector
              carBrands={carBrands}
              carModels={carModels}
              selectedCarBrand={selectedCarBrand}
              selectedCarModel={selectedCarModel}
              onChange={this.handleCarModelChange}

            />
            <KeywordsField
              recommendedKeywords={recommendedKeywords}
              onChange={this.handleKeywordsChange}
            />
          </div>
          <div className="search-submit">
            <Button
              id="B"
              fullWidth
              variant="contained"
              disabled={!(selectedCarBrand || selectedCarModel || keyWords.length > 0)}
              onClick={this.handleSubmit}
            >
              {T.searchButtonText}
            </Button>
          </div>
        </div>
      </div>

    );
  }
}

export default SearchPage;
