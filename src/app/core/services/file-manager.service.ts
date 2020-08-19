import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable()
export class FileManagerService {

	uploadProgress: Observable<number>;
	uploadURL: Observable<string>;
	estado = new BehaviorSubject({});
	fileReference: AngularFireStorageReference;
	
	constructor(
		private storage: AngularFireStorage) {
		this.estado.next(true);
	}

	async upload(file, filepath): Promise<any> {
		// Get input file
		//const file = event.target.files[0];
		this.estado.next(true);
		const fileRef = this.storage.ref(filepath);
		// Upload image
		const task = this.storage.upload(filepath, file);
		// Observe percentage changes
		this.uploadProgress = task.percentageChanges();
		// Get notified when the download URL is available
		return task.snapshotChanges().pipe(
			finalize(() => {
				this.uploadURL = fileRef.getDownloadURL();
				this.estado.next(false);
			})
		).toPromise();
	}

	deleteFilesFolder(path) {
		return this.storage.ref(path).delete();
	}

	getEstado() {
		return this.estado.asObservable();
	}

	uploadImageBase64(file: string, filepath): void {
		this.estado.next(true);

		this.fileReference = this.storage.ref(filepath);
		var image = 'data:image/jpg;base64,' + file;

		var task = this.storage.ref(filepath).putString(image, 'data_url');

		this.uploadProgress = task.percentageChanges();

		task.snapshotChanges().pipe(
			finalize(() => {
				// this.uploadURL = fileRef.getDownloadURL();
				this.estado.next(false);
			})
		).subscribe();
	}

	getUrlFileInfo(path) {
		return this.storage.ref(path).getDownloadURL();
	}
}
