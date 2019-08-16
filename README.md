# PWA React-Bootstrap-Firebase Sample
pwa-rbf-sample

A sample of a Progressive Web App using React; Bootstrap and Firebase's Cloud Firestore and Cloud Functions.

## Dependencies

### Bootstrap 4

The best CSS framework is added by NPM and we use its CSS only. It's the easiest and lightest way avoiding React components that are too heavy and complex to customise. You have full control of Bootstrap's classes.

## Set up

### Set up Firebase Firestore data

You'll need two collections (Products and Users) for this sample app.

```
db.collection('products').add({
    name: 'Product Name', // string
    description: 'Product description', // string
    price: 99, // number
})

db.collection('users').add({
    first_name: 'Name', // string
    last_name: 'Last Name', // string
    email: 'name@email.com', // number
    device_tokens: [ // array
        'aaaa9999', // string
    ],
    collection('cart').add({
        name: 'Product Name', // string
        ref_product: db.collection('products') reference // collection products reference
    })
})
```

### Set up Firebase Firestore config file

/react/src/firebase.js

```
import * as firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

firebase.initializeApp(config);

export default firebase;
```

Read more: https://firebase.google.com/docs/firestore/quickstart

### Set up Firebase Messaging config file

/react/src/firebase.messaging.js

```
import firebase from './firebase'   // Firebase config

// Retrieve Firebase Messaging object.
var messaging = firebase.messaging();
messaging.usePublicVapidKey("### Thy Key ###");

export default messaging;
```

### Firebase Hosting

In case you want to publish this on Firebase Hosting, you just need to init Firebase to this projects home folder. It's going to create two files that are already ignored by Git. Set the Hosting public folder to react/build and you're ready to run.

Read more: https://firebase.google.com/docs/hosting/quickstart

### More steps

Soon