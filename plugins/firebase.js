import firebase from 'firebase/app'
import 'firebase/database'

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