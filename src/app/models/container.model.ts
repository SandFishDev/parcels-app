export interface Container {
  id: Number,
  containerId: Number,
  shippingDate: Date,
  arrivalDate: Date,
  parcels: Parcel[],
}

export interface Parcel {
  id: number
  value: Number,
  weight: Number,
  receipient: Receipient,
  department: string,
}

export interface Receipient {
  name: string,
  address: Address
}

export interface Address {
  street: string,
  houseNumber: string,
  postalCode: string,
  city: string
}

