import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
    firebase.initializeApp(
        {
            apiKey: process.env.APIKEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECTID
        }
    )
}

export default firebase