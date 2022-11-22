export const jwtConstants = {
    secret: 'vba2137asdjao12341m',
    expiresIn: '1d'
}

export interface JwtPayload {
    id: number;
    email: string;
}