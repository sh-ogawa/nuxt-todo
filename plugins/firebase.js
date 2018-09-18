import firebase from 'firebase'
require('dotenv').config();

if (!firebase.apps.length) {
    firebase.initializeApp(
        {
            apiKey: process.env.APIKEY,
            databaseURL: process.env.DATABASEURL,
            projectId: process.env.PROJECTID,
        }
    )
}

export default firebase