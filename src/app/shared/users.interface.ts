export interface User {
    id: number,
    name: string,
    birthdate: string,
    addresses: Address[]
}

export interface Address {
    name: string,
    countrId: number,
    cityId: number,
    street: string
}
