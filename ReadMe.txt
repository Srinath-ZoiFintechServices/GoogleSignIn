Steps

1)Install 
npm install --save @react-native-firebase/app
npm install @react-native-firebase/auth
@react-native-google-signin/google-signin


2)Add 
Dependencies in build.grale
classpath 'com.google.gms:google-services:4.3.10'

inside app build.grale
apply plugin: 'com.google.gms.google-services'


3)Generate Kystore file in jdk folder
keytool -genkeypair -v -storetype PKCS12 -keystore signin.keystore -alias signin-alias-key -keyalg RSA -keysize 2048 -validity 10000


4)Get Sha1 by typing thi code
keytool -list -v -keystore C:\Users\ADMIN\Documents\Srinath\RandD\ReactNative\GoogleSignin\GoogleSignIn\android\app\signin.keystore -alias signin-alias-key -storepass google123 -keypass google123


5)Create App on your firebase console


6)Add the Sha1 key to your app. and download app setting .json to your android->app folder.


7)Get the clientid from the firebase and use it in the project.
