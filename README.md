# Adeno
The first open-source European game to vote for the 2024 elections!

## Solo mode

Explore the issues, parties, and candidates on your own to understand the political landscape of the 2024 elections. Make informed decisions and see how your choices align with european political groups.

## Multiplayer mode

Compete with friends or other players online to see who has the best grasp of the political spectrum.

## Installation
To set up your environment and run the app, follow these steps:

### Prerequisites

- Ensure you have a Firebase project set up as this app uses Firebase for authentication and database (for the study). Visit [Firebase Console](https://console.firebase.google.com/) to create a new project if you haven't done so.
- After setting up your Firebase project, you will need to configure the environment variables for the app. Create a `.env` file in the root directory of your project and include your Firebase project's configuration details and any other API URLs or keys your app might use. The `.env` file should look something like this:

```bash
API_KEY=your_firebase_api_key_here
AUTH_DOMAIN=your_firebase_auth_domain_here
PROJECT_ID=your_firebase_project_id_here
STORAGE_BUCKET=your_firebase_storage_bucket_here
MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
APP_ID=your_firebase_app_id_here
```

### Step 1: Install node modules

Before you can run the app, you need to install its dependencies. Open your terminal, navigate to your project's root directory, and run:

```bash
npm install
```

### Step 2: Launch the app
Execute the following command in your terminal:

```bash
npx expo start
```
This starts the Expo CLI server. You'll see a QR code displayed in your terminal. Scan this QR code with the Expo Go app (available on Android and iOS) to run your app on your mobile device. Alternatively, you can:

* Press i to open the app in the iOS simulator (macOS only).
* Press a to open the app in the Android emulator (ensure you have an emulator installed beforehand).

## License

This project is made available for personal use and modification under the terms of a custom license. While you are free to view and modify the code for your own use, the distribution of the app or any derivative works is strictly prohibited without explicit permission from the author.

For detailed license terms, please refer to the LICENSE file in this repository.

## Author

François Mari

## Contact

For feedback or questions, please contact us at hello@adeno.app.
