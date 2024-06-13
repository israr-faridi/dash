// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const field1 = document.getElementById('field1').value;
    const field2 = document.getElementById('field2').value;
    const field3 = document.getElementById('field3').value;
    const field4 = document.getElementById('field4').value;
    const field5 = document.getElementById('field5').value;
    const field6 = document.getElementById('field6').value;
    const field7 = document.getElementById('field7').value;

    if (fileInput.files.length === 0) {
        alert('Please upload a photo');
        return;
    }

    const uploadedFile = fileInput.files[0];

    try {
        // Upload file to Firebase Storage
        const storageRef = storage.ref('images/' + uploadedFile.name);
        const snapshot = await storageRef.put(uploadedFile);
        const downloadURL = await snapshot.ref.getDownloadURL();

        // Save data to Firestore
        await db.collection('uploads').add({
            field1,
            field2,
            field3,
            field4,
            field5,
            field6,
            field7,
            imageUrl: downloadURL
            
        });
 
        alert('Upload successful!');
        document.getElementById('uploadForm').reset();
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file, please try again');
    }
});
