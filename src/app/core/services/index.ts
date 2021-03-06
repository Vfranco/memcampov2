import { AuthService } from './auth.service';
import { CiclosService } from './ciclos.service';
import { CategoriesService } from './categories.service';
import { DocumentosService } from './documentos.service';
import { FirebaseService } from './firebase.service';
import { LocalstorageService } from './localstorage.service';
import { TiposcultivoService } from './tiposcultivo.service';
import { TipsService } from './tips.service';
import { UserService } from './user.service';
import { FileManagerService } from './file-manager.service';
import { CultivosService } from './cultivos.service';
import { UniqueService } from './unique.service';

export * from './auth.service';
export * from './ciclos.service';
export * from './categories.service';
export * from './documentos.service';
export * from './firebase.service';
export * from './localstorage.service';
export * from './tiposcultivo.service';
export * from './tips.service';
export * from './user.service';
export * from './file-manager.service';
export * from './cultivos.service';
export * from './unique.service';

export const SERVICES = [
    AuthService,
    CiclosService,
    CategoriesService,
    DocumentosService,
    FirebaseService,
    LocalstorageService,
    TiposcultivoService,
    TipsService,
    UserService,
    FileManagerService,
    CultivosService,
    UniqueService
]
