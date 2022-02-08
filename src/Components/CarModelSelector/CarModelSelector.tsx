import {
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { CarBrand, CarModel } from '../../types/demoAppModels';

const T = {
  modelInputLabel: 'Model',
  modelInputSelectAll: 'All models',
  modelInputSelectBrandFirst: 'Select a car brand first',
};

interface CarModelSelectorProps {
  carBrands: CarBrand[] | null
  carModels: CarModel[] | null
  selectedCarBrand: string | null
  selectedCarModel: string | null
  onChange: (event: SelectChangeEvent<string | null>) => void
}

const CarModelSelector:React.FC<CarModelSelectorProps> = ({
  carBrands,
  carModels,
  selectedCarBrand,
  selectedCarModel,
  onChange,
}):JSX.Element => (
  <FormControl fullWidth>
    <InputLabel id="car-model-label">{T.modelInputLabel}</InputLabel>
    <Select
      labelId="dcar-model-label"
      id="S2"
      value={selectedCarModel}
      label="Car Brand"
      onChange={onChange}
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
);

export default CarModelSelector;
