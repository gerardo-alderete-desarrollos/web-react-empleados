export interface IEmpleado {
     idEmpleado?: number,
    nombre: string,
    apellidos: string,
    contrasena: string,
    fechaNacimiento: Date | null | string,
    urlFoto: string
}