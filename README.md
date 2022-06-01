## Face-Exe

Face.exe is a face detection and face recognition web application.
Features:

>  - Detect your face expression and show custom text depending on your facial expression. Ex: if you're sad It'll cheer you up with a joke,
> if you're angry it' show you a peaceful quote to calm you down.
>  - Uses fairebase to upload model images and train model by fetching images from firebase bucket.
>  - detect the person in the image using the trained models.


****To run it locally just run the index.html file or use the visual studio code's live server extention or just visit the website link.****

***Note:*** 

>  - *It is hosted on a FREE hosting service (netlify) so it might be little slow    sometimes, PLEASE always use Google chrome for the best 			  results
> and less wait.*
>    
>  - *Currently the realtime database functionality is not working, although you can successfully upload the images to train model using "upload button"
> and it'll update that in database too but currently it can't read from database, that's why I have
> stored it locally for now in an array too. So please in order to test the
> "Select image" button functionality just please select the sample images given
> in image folder. or use any of your own photos of following actors from the
> internet.  list: [leonardo de caprio, robert pattinson, chris
> evans, tom cruse, robert downey, johnny depp, will smith]*. If you want to upload image of your own favourit actor to firebase regardless to train their model and see if it actually works or not, just manually add the exact name of that actor as in the file name that you uploaded just without extention in the array locally, which on line number 106 of script.js 😔 Sorry for this inconvenience but I'm working to fix this problem ASAP.
>  - *Because of time and money constrains this functionality was not completed but it is very easy to do and can be easly done by switching
> to the premium firebase plan and giving it little bit more time.*


Below are some screenshots of the app:
<img width="1440" alt="Screenshot 2022-05-29 at 23 59 11" src="https://user-images.githubusercontent.com/80591258/170886024-bfeb3040-cd1d-4c42-b908-1c23bd82292a.png">

<img width="1440" alt="Screenshot 2022-05-29 at 23 59 28" src="https://user-images.githubusercontent.com/80591258/170886030-fd98bca8-26d5-4b89-aac7-953b5e7b094b.png">

<img width="1440" alt="Screenshot 2022-05-29 at 23 59 47" src="https://user-images.githubusercontent.com/80591258/170886036-8f5a0707-901b-4c40-a39e-716bdc640338.png">

Dark mode:
<img width="1440" alt="Screenshot 2022-05-30 at 00 01 57" src="https://user-images.githubusercontent.com/80591258/170886117-c0472005-9e0c-435f-9d9d-95ccd560c521.png">

### Proof of Firebase working:

Function in this screenshot is responsible for uploading files to bucket and rename them and make a database entry with the file name to use it later.

<img width="677" alt="Screenshot 2022-06-01 at 20 48 16" src="https://user-images.githubusercontent.com/80591258/171440471-95b166ca-1d55-4d3c-99c4-8024cfd932ea.png">

Screenshots of firebase bucket and realtime database:

![Screenshot 2022-06-01 at 20 54 33](https://user-images.githubusercontent.com/80591258/171441157-910db389-7408-4059-8efc-12f26c6b1986.png)


<img width="1175" alt="Screenshot 2022-06-01 at 20 49 22" src="https://user-images.githubusercontent.com/80591258/171440593-f2cdc42d-375d-4003-8e7d-3039427705c4.png">


Hosted website link: https://faceexe.netlify.app/ (Please open in Google Chrome)

Firebase Index: https://storage.googleapis.com/face-exe.appspot.com/

Demo video: https://youtu.be/NsUxctK9Ulo
