export interface UsuarioDTO{
        id: integer;
        nombre?: string;
        contraseña?: string;
        estado: boolean;
        empleadoId: integer;
}

export interface UsuarioRegistrarDTO{

    nombre: string;
    contraseña: string;
    estado: boolean;
    empleadoId: integer;
}

export interface ListaUsuarioDTO{
    id: integer;
    nombre: string;
    contraseña: string;
    estado: boolean;
    nombreEmpleado: string;
    apellidoEmpleado: string;
}