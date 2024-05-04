export type Project = {
    title: string,
    year: number,
    type: ProjectType,
    role: string,
    imagePath: string,
    url: string | null
}

export type Vector2 = {
    X: number,
    Y: number
}

export const enum ProjectType {
    Academic,
    Professional,
    Miscellaneous
}