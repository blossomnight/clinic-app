export enum UserType {
    None,
    Patient,
    Doctor,
}

export enum ScreenType {
    None,
    TypeTestResults,
    TypePerscriptions,
    TypeCreateConsultation,
    TypeConsultations
}

export type RowPlaceholders = {
    placeholder1: string,
    placeholder2: string,
    placeholder3: string,
    placeholder4: string,
}