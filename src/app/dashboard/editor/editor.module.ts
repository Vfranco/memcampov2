import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentosComponent } from './documentos/documentos.component';
import { ListdocumentosComponent } from './listdocumentos/listdocumentos.component';
import { TipsComponent } from './tips/tips.component';
import { BpaComponent } from './bpa/bpa.component';
import { CategoriasComponent } from './categorias/categorias.component';

const editorRoute : Routes = [
	{ path : 'documentos', component: DocumentosComponent },
	{ path : 'list', component: ListdocumentosComponent },
	{ path : 'tips', component: TipsComponent },
	{ path : 'bpa', component: BpaComponent },
	{ path : 'categorias', component: CategoriasComponent }
]

@NgModule({
	declarations: [
		DocumentosComponent,
		ListdocumentosComponent,
		TipsComponent,
		BpaComponent,
		CategoriasComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(editorRoute)
	]
})
export class EditorModule { }
