import { Accessory } from "./accessory";
export class Car {
  constructor(
    public id: string,
    public infos: {
      brand: string,
      model: string,
      immatriculation: string
    },
    public photo:string,
    public power: number,
    public circulationDate: Date,
    public isAutomatic: boolean,
    public accessoryList: Accessory[]
  ) { }
}
