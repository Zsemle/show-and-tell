import React, { useCallback, useEffect, useState } from 'react';
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

const SearchPage:React.FC = ():JSX.Element => {
  const [brandsLoading, setbrandsLoading] = useState<Boolean>(true);
  const [modelsLoading, setmodelsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error | AxiosError |null>(null);
  const [carBrands, setcarBrands] = useState< CarBrand[] | null>(null);
  const [carModels, setcarModels] = useState< CarModel[] | null>(null);
  const [selectedCarBrand, setselectedCarBrand] = useState< string>('');
  const [selectedCarModel, setselectedCarModel] = useState< string>('');
  const [keyWords, setkeyWords] = useState< string[]>([]);

  const handleCarBrandChange = useCallback(
    (event:SelectChangeEvent<string>) => {
      setselectedCarBrand(event.target.value);
    },
    [],
  );

  const handleCarModelChange = useCallback(
    (event:SelectChangeEvent<string>) => {
      setselectedCarModel(event.target.value);
    },
    [],
  );

  const handleKeywordsChange = useCallback(
    (event:React.SyntheticEvent<Element, Event>, value: string[]) => {
      setkeyWords(value);
    },
    [],
  );

  const handleSubmit = useCallback(
    () => {
      Axios.post('http://localhost:3001/seachCars', {
        selectedCarBrand,
        selectedCarModel,
        keyWords,
      })
        .then(
          (response:AxiosResponse) => {
            console.log(response);
          },
          (APIerror) => {
            setError(APIerror);
          },
        );
    },
    [],
  );

  useEffect(() => {
    Axios.get('http://localhost:3001/carbrands')
      .then(
        (response:AxiosResponse) => {
          setcarBrands(response.data.map((brandData:any) => new CarBrand(brandData)));
          setbrandsLoading(false);
        },
        (APIerror) => {
          setError(APIerror);
          setbrandsLoading(false);
        },
      );
  }, []);

  useEffect(() => {
    setselectedCarModel('');
    setcarModels(null);
    if (selectedCarBrand) {
      setmodelsLoading(true);
      Axios.get(`http://localhost:3001/modelsofcarbrand/${selectedCarBrand}`)
        .then(
          (response:AxiosResponse) => {
            setcarModels(response.data.map((carModelData:any) => new CarModel(carModelData)));
            setmodelsLoading(false);
          },
          (APIerror) => {
            setError(APIerror);
            setmodelsLoading(false);
          },
        );
    }
  }, [selectedCarBrand]);

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
            onChange={handleCarBrandChange}
          />
          <CarModelSelector
            carBrands={carBrands}
            carModels={carModels}
            selectedCarBrand={selectedCarBrand}
            selectedCarModel={selectedCarModel}
            onChange={handleCarModelChange}
          />
          <KeywordsField
            recommendedKeywords={recommendedKeywords}
            onChange={handleKeywordsChange}
          />
        </div>
        <div className="search-submit">
          <Button
            id="B"
            fullWidth
            variant="contained"
            disabled={!(selectedCarBrand || selectedCarModel || keyWords.length > 0)}
            onClick={handleSubmit}
          >
            {T.searchButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
