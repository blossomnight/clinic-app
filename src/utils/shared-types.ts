export enum UserType {
    None,
    Patient,
    Doctor,
}

export enum ScreenType {
    None,
    TypeTestResults,
    TypePrescriptions,
    TypeCreateConsultation,
    TypeConsultations
}

export type RowPlaceholders = {
    placeholder1?: string,
    placeholder2?: string,
    placeholder3?: string,
    placeholder4?: string,
}

export type DoctorDetails = {
    user_id?: string;
    name: string;
    specialization: string;
    visits: {date: string}[];
}


export type ReservedConsultation = {
    id: number,
    date: number,
    doctor_id: number,
    doctor_name: string,
    specialization: string,
}

export type Medication = {
    medicationId: number,
    name: string,
    price: number,

}
export type PrescriptionData = {
    serialNumber: number,
    date: string,
    medications?: Array<Medication>
}

export type TestResult = {
    date: string,
    code: string,
    testType: string,
    laboratory: string,
}


