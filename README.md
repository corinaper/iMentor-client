<img src="https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png" width="200"/> &nbsp; <img src="https://i.ibb.co/txcgFGM/yapic.png" width="200"/> -->

# iMentor: Find a mentor in the Ironhack community

## Description

**iMentor** You started your journey as a developer at Ironhack. Do you need some advice? We give you the option to get in touch with some senior Ironhackers so you can find the best mentor to guide you through your new journey. With iMentor you will find the best mentor within the Ironhack community.

## User Stories

- **Error 4xx**- As a user, I want to see a clear error page when it doesn't exist/has restricted access so that I know I probably make a mistake.
- **index/home** - As a user, I want to seamless access the index/home so that I know I'm the right place to begin the flow.
- **signup** - As a user, I want to signup in a secure and easy way on the webpage so that I can start using the app.
- **login** - As a user, I want to be able to login on the webpage so that I can see my personal account.
- **logout** - As a user, I want to be able to logout from the webpage so that I can make sure no one will access my personal account.
- **edit profile** - As a user, I want to be able to edit my profile so that I can modify my personal data.
- **search mentors** - As a user, I want to see and filter through the list of available mentors
- **see post** - As a user, I want to see users' posts in an easy way where I can comment and engage
- **create post** - As a user, I want to create my posts in an easy way where I can ask all mentors a question
- **edit post** - As a user, I want to edit my posts in an easy way
- **chat messages** - As a user, I want to send messages to mentors

## Server Routes/Views:

|**Path**    |    **Components**           |    **Permission**     |   **Behaviour**       |                          
|--------------|-------------------|------------------------|-----------------------------------|
|"/"         |               |      public              | Home page  |
|"/signup"      | SignUp form      |   anon only        | Signup form, link to login, navigate to homepage after signup  |
|"/login"       |  Login Form      |    anon only       | Login form, link to signup, navigate to homepage after login  |
|"/mentors"     |  Footer, header, skills, mentor card | user only | Shows a list of mentors and gives the option to filter based on skills          | 
|"/questions"   |   Footer, header, skills, Question card |  user only  | Shows a list of questions and gives the option to filter based on the question topic |   
|"/questions/add" |   Footer, header    |      user only         | Adds a question to the feed/list      | 
|"/questions/:id" |    Footer, header          |      user only     | See the details of the specific question  |
|"/questions/:id/delete" |       |      user only     | Delete the question(only the owner can do it)  |  
|"/profile/:id"        |     Footer, header       |      user only     | The details of the mentor/mentee            |
|"/profile/:id/edit"        |    Footer, header   |      owner only    | Edit the details of the mentor/mentee  | 
|"/chats/:id"        |    Footer, header, chat card        |   user only | See the list of messages  | 
|""chats/:id/:otherId""        |    Footer, header         |   user only | See  chat with a person  | 


### Git

[Repository Link](https://github.com/iMentorIronhack)


### Contributors

Corina Perjan - [`Github`](https://github.com/corinaper) - [`<linkedin`](https://www.linkedin.com/in/corina-perjan/)

Alberte Vieites - [`Github`](https://github.com/albertevieites) - [`linkedin`](https://www.linkedin.com/in/albertevieites/)

Adrian Molina - [`Github`](https://github.com/01000001kuma) - [`linkedin`](https://www.linkedin.com/in/adrian-molina/)

Klaus Haugness- [`Github`](https://github.com/klaus2132) - [`linkedin`](https://www.linkedin.com/in/klaus-haugness)