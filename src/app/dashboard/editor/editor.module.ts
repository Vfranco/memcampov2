import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentosComponent } from './documentos/documentos.component';
import { ListdocumentosComponent } from './listdocumentos/listdocumentos.component';
import { TipsComponent } from './tips/tips.component';
import { BpaComponent } from './bpa/bpa.component';
import { CategoriasComponent } from './categorias/categorias.component';

const editorRoute : Routes = [
	{ path : 'dashboard/editor/documentos', component: DocumentosComponent },
	{ path : 'dashboard/editor/list', component: ListdocumentosComponent },
	{ path : 'dashboard/editor/tips', component: TipsComponent },
	{ path : 'dashboard/editor/bpa', component: BpaComponent },
	{ path : 'dashboard/editor/categorias', component: CategoriasComponent }
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
