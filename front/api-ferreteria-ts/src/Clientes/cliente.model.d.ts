export interface ClienteDTO{
    id: integer;
    nombre?:string ;
    apellido?: string;
    numdocumento: integer;
    estado: boolean;
}

export interface ClienteRegistrarDTO{
    nombre:string;
    apellido:string;
    numdocumento:integer;
    estado:boolean;
}