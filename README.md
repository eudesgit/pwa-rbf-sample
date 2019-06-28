# PWA React-Bootstrap-Firebase Sample
pwa-rbf-sample

A sample of a Progressive Web App using React; Bootstrap and Firebase's Cloud Firestore and Cloud Functions.

## Set up

### Set up Firebase Firestore

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
        ref_product: db.collection('products') ref // collection products ref
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

var fb = firebase.initializeApp(config);

export default fb;
```

### Set up Firebase Messaging config file

/react/src/firebase.messaging.js

```
import firebase from './firebase'   // Firebase config

// Retrieve Firebase Messaging object.
var messaging = firebase.messaging();
messaging.usePublicVapidKey("### Thy Key ###");

export default messaging;
```

### More steps

Soon