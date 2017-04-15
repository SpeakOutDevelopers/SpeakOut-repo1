export interface Evento{
    usuario: {
        key: string, 
        nombre: string,  
        img: string,
        biografia: string,
        idiomas: any[],
    },
    idiomas: any[],
    ubicacion: string,
    hora_inicio: string,
    hora_fin: string,
    fecha_creacion: any,
    fecha_evento: string
}

export interface Usuario {
    $key: string,
    idiomas: [{nombre: string, nivel: number}],
    nombre: string,
    img: string,
    edad: number,
    biografia: string,
    chats:[{
        last_message: string,
        recipient: {
            key: string,
            name: string,
            img: string
        } 
    }]
}

export interface Idioma{
    nombre: string,
    img: string
}
export interface Ubicacion {
    nombre: string,
    lat: number,
    long: number
}
export interface Mensajes{
    remitente: {
        key: string,
        nombre: string,
    }
    tiempo: string,
    mensaje: string

}