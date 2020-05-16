export class AccountRegister {
    nombres: string = '';
    apellidos: string = '';
    email: string = '';
    password: string = '';
    confirm: string = '';
    rol: string = 'Agricultor';
    celular: string = '';
    fecha_registro: any = new Date().getDate();
    fecha_gracia: any = new Date(new Date().getDate() + 30);
    id_rol: string = '2';
    medio_registro: string = 'web';
    pais: string = 'Colombia';
    status: boolean = true;
}