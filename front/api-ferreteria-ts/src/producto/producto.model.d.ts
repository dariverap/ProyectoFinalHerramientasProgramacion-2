export interface ProductoDTO{
    id: integer;
    nombre?:string;
    descripcion?: string;
    stock: integer;
    estado: boolean;
    precio: integer;
    categoriaId: integer;

}

export interface ProductoRegistrarDTO{

    nombre:string;
    descripcion: string;
    stock: integer;
    estado: boolean;
    precio: integer;
    categoriaId: integer;

}

export interface MostrarProductosDTO{
    id: integer;
    nombre:string;
    descripcion: string;
    stock: integer;
    estado: boolean;
    precio: integer;
    nombreCategoria: string;

}