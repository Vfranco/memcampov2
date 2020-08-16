import { AuthService } from './auth.service';
import { CiclosService } from './ciclos.service';
import { CategoriesService } from './categories.service';
import { DocumentosService } from './documentos.service';
import { FirebaseService } from './firebase.service';
import { LocalstorageService } from './localstorage.service';
import { TiposcultivoService } from './tiposcultivo.service';
import { TipsService } from './tips.service';
import { UserService } from './user.service';

export * from './auth.service';
export * from './ciclos.service';
export * from './categories.service';
export * from './documentos.service';
export * from './firebase.service';
export * from './localstorage.service';
export * from './tiposcultivo.service';
export * from './tips.service';
export * from './user.service';

export const SERVICES = [
    AuthService,
    CiclosService,
    CategoriesService,
    DocumentosService,
    FirebaseService,
    LocalstorageService,
    TiposcultivoService,
    TipsService,
    UserService
]
