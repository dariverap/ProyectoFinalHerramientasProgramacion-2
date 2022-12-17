export interface EmpleadoDTO{
    id: integer;
    nombre?:string;
    apellido?: string;
    estado: boolean;
    rolId: integer;
}

export interface EmpleadoRegistrarDTO{

    nombre:string;
    apellido: string;
    estado: boolean;
    rolId: integer;
}

export interface RolDTO{
    id: integer;
    nombre:string;
    estado:string;
}

export interface ListaEmpleadoDTO{
    id: integer;
    nombre:string;
    apellido: string;
    estado: boolean;
    nombreRol: string;
}