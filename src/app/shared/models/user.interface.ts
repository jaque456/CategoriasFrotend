export interface User {
    usuario: string;
    password: string;
}

export interface UserResponse {
    message: string;
    token: string;
    cveUsuario: string;
    username: string;
    apellidos: string;
    nombre: string;
    nombreCategoria: string;
    nombreTipo: string;
    descripcion: string;
}