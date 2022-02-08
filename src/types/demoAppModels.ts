/* eslint-disable max-classes-per-file */
interface ICarModel {
    id:string
    displayName:string
}

export class CarModel {
  id:string;

  displayName:string;

  constructor({ id, displayName }:ICarModel) {
    this.id = id;
    this.displayName = displayName;
  }
}

interface ICarBrand {
    id:string
    displayName:string
    availableModels:CarModel[]
}

export class CarBrand {
  id:string;

  displayName:string;

  availableModels:CarModel[];

  constructor({ id, displayName, availableModels }:ICarBrand) {
    this.id = id;
    this.displayName = displayName;
    this.availableModels = availableModels;
  }
}
