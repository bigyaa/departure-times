# Departure Times

This project is done as a part of a **coding assignment**.

The main goal here is to provide a service that gives real-time departure time for public transportation, currently only the underground railway transport. However, it can be scaled to include other forms of public transportation in the future. The API currently in use is from the *[Transport for London Unified API](https://api.tfl.gov.uk/)*, limiting the service to the tranports in the UK area only. Given the origination station and the destination station, this application can provide real-time timetable, containing arrival and departure time information of the public transports, thus making it convenient for the people to navigate their travels whenever they need it.

This solution focuses on the **front-end** part, which includes the *UI/UX*, *API integration* and *data manipulation*.

### Technical Choices:
- This project was bootstrapped using **[Create React App](https://github.com/facebook/create-react-app)**. This helped to create the project within a small time-frame without manually having to configure files and dependencies. 
- For styling, **[Bootstrap](https://getbootstrap.com/)** and **CSS** were used. Bootstrap helps to build responsive, mobile-first web applications quickly and effectively.
- **[Momentjs](https://momentjs.com/)** was used to format the time as needed.
- To integrate APIs, **[Axios](https://github.com/axios/axios)** was used. Using Axios, it's easy to send asynchronous HTTP request to REST endpoints and perform CRUD operations.
- **Jest** and **Enzyme** were used for testing the react components.
- If time allows, the **google-maps-react** library will be used to visually demonstrate the routes in the map, for a better user experience.

### What I left out?
- Display departure time of transports within the area of the user by geo-localizing the user.

### What I might do differently if I were to spend additional time on the project?
1. Use the **google-maps-react** library to visually demonstrate the routes in the map, for a better user experience.
2. Find more useful APIs to facilitate public transportation information covering more areas and of different modes of transportation.
3. Create a better UI/UX.
4. Use Redux for state management and provide more control for the user to search routes and transportation timings.

### Link to other code I'm proud of:
- [Basic Phonebook Application](https://github.com/bigyaa/fullstackopen2019_backend_exercises)
- [Coding exercises I did as a part of a fullstack course](https://github.com/bigyaa/fullstackopen2019_exercises)
- [Angry Birds Game using pure HTML, CSS and JS](https://github.com/bigyaa/angry-birds)

### My Public Profiles:
- **[Github](https://github.com/bigyaa)**
- **[Linkedin](https://www.linkedin.com/in/bigyabajracharya/)**

This application is hosted ***here***.