// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	BASE_URL_BLOG: "https://blog.memoriadecampo.com",
	BASE_URL_IMG: "https://api.memoriadecampo.com",
	ID_BASE_URL: 1,
	API_BPA: "http://localapi.memcampo.com",
	RESET_PASSWORD : "http://localhost:4200/reset",
	firebase: {
		apiKey: "AIzaSyDbLvwEUgFL4rluWlHLE5HCAr-2ZzfhAtQ",
		authDomain: "memoria-de-campo.firebaseapp.com",
		databaseURL: "https://memoria-de-campo.firebaseio.com",
		projectId: "memoria-de-campo",
		storageBucket: "gs://memoria-de-campo.appspot.com/",
		messagingSenderId: "858158867685"
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
