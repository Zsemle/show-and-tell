import React from 'react';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import './SearchPage.css';
import {
  Autocomplete, Button, Chip, FormControl,
  InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import { CarBrand, CarModel } from '../../types/demoAppModels';

const T = {
  searchPanelTitle: 'Buy a car',
  brandInputLabel: 'Brand',
  selectNothing: 'None',
  modelInputLabel: 'Model',
  modelInputSelectAll: 'All models',
  modelInputSelectBrandFirst: 'Select a car brand first',
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
      <div className="demo-app">
        <div className="search-panel">
          <h1>{T.searchPanelTitle}</h1>
          {modelsLoading && 'loading models'}
          {brandsLoading && 'loading brands'}
          {error && 'an error has occured'}
          <div className="seach-parameters">
            <FormControl fullWidth>
              <InputLabel id="car-brand-label">{T.brandInputLabel}</InputLabel>
              <Select
                labelId="car-brand-label"
                id="S1"
                value={selectedCarBrand}
                label="Car Brand"
                onChange={this.handleCarBrandChange}
              >
                {selectedCarBrand && <MenuItem value="">{T.selectNothing}</MenuItem>}
                {carBrands?.map((carBrand) => (
                  <MenuItem key={carBrand.id} value={carBrand.id}>{carBrand.displayName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="car-model-label">{T.modelInputLabel}</InputLabel>
              <Select
                labelId="dcar-model-label"
                id="S2"
                value={selectedCarModel}
                label="Car Brand"
                onChange={this.handleCarModelChange}
                disabled={!selectedCarBrand}
              >
                {carBrands
                  ? <MenuItem value="">{T.modelInputSelectAll}</MenuItem>
                  : <MenuItem value="">{T.modelInputSelectBrandFirst}</MenuItem>}

                {carModels?.map((carModel) => (
                  <MenuItem key={carModel.id} value={carModel.id}>{carModel.displayName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Autocomplete
              multiple
              id="T"
              options={recommendedKeywords}
              freeSolo
              renderTags={(value: readonly string[], getTagProps) => value.map(
                (option: string, index: number) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ),
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Keywords"
                  placeholder="for example: AMG"
                />
              )}
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
