interface AddressData {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
}

interface BankData {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface CompanyData {
    department: string;
    name: string;
    title: string;
    address: AddressData;
}

interface CryptoData {
    coin: string;
    wallet: string;
    network: string;
}

interface HairData {
    color: string;
    type: string;
}

export interface User {
    address: AddressData;
    age: number;
    bank: BankData;
    birthDate: string;
    bloodGroup: string;
    company: CompanyData;
    crypto: CryptoData;
    ein: string;
    email: string;
    eyeColor: string;
    firstName: string;
    gender: string;
    hair: HairData;
    height: number;
    id: number;
    image: string;
    ip: string;
    lastName: string;
    macAddress: string;
    maidenName: string;
    password: string;
    phone: string;
    role: string;
    ssn: string;
    university: string;
    userAgent: string;
    username: string;
    weight: number;
}