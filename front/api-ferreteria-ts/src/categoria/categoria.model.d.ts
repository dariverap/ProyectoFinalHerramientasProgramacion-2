export interface CategoriaDTO{
    id: integer;
    nombre?:string;
    descripcion?: string;
    estado: boolean;
}

export interface CategoriaRegistrarDTO{
    nombre:string;
    descripcion: string;
    estado: boolean;
}