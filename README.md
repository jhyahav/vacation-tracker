<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/jhyahav/vacation-tracker">
    <img src="public/icon.jpg" alt="vacation tracker icon" width="256" height="256">
  </a>

<h3 align="center">Vacation Tracker</h3>

  <p align="center">
    your one-stop-shop for destination information
  </p>
</div>

## About

[![screenshot of vacation-tracker][product-screenshot]](https://vacation-tracker-app.vercel.app/)

Vacation Tracker enables you to conveniently keep track of all the cities you've visited, plan to visit, or wish you could visit. The seamless signup and login process will have you adding cities to your dashboard in no time! 

View live weather data, skyline photos, and the current time in as many cities as you like.

Built responsively and performantly to empower you to instantly edit your list of destinations, at home or on the go. Want to stop and pick up where you left off? Your destinations are conveniently stored between sessions, so no need to leave the app open.

### Built with

[![Typescript][typescript]][typescript-url] [![React][react.js]][react-url] [![React-Router][react-router]][react-router-url] [![React-Query][react-query]][react-query-url] [![MUI][mui]][mui-url] [![Vite][vite]][vite-url] [![Firebase][firebase]][firebase-url] [![Jest][jest]][jest-url] [![Unsplash][unsplash]][unsplash-url] [![OpenWeatherMap][openweathermap]][openweathermap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### To run the app locally:
1. **Clone this repository:**
   ```bash
   git clone https://github.com/jhyahav/vacation-tracker
   cd vacation-tracker
2. **Install dependencies:**
   ```bash
   npm install
3. **Add your API keys to `.env`:**
   ```bash
    VITE_UNSPLASH_ACCESS_KEY = "YOUR_ACCESS_KEY"
    VITE_OPENWEATHERMAP_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"
4. **Start the development server:**
   ```bash
   npm run dev
5. **Access the dashboard:**
   Open your browser and navigate to http://localhost:5173 to view the app.


### Other available scripts:
* ```bash
   npm run lint
  ```
  Lints project files using eslint.
  
* ```bash
   npm run test
  ```
  Runs project test files.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## State Management
I chose to use the React `Context` API with `useReducer` for state management in this project. Code related to global state can be found in the `global-state` directory. This includes `AuthContext.tsx`, which manages authentication/user state, and `DashboardContext.tsx`, which manages the destinations displayed on each user's dashboard. The latter also saves the dashboard state to the browser's local storage so that it is persisted between sessions.

The choice to the `Context` API was informed by a desire for simplicity, scalability, and native support.
The `Context` API is suitable for managing app-wide state for destinations and user data without the overhead of a full state management library.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Code Splitting
Since this app is relatively small and only has a few routes, although it would be possible (and fairly straightforward) to implement code splitting in the router, I opted not to do so.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Features

* Email/password authentication powered by Firebase, with clear and secure password requirements enforced both client-side and server-side.
* Responsive, user-friendly destination dashboard.
* Intuitive creation, editing, and deletion of destinations on dashboard.
* Integration with Unsplash for skyline photos.
* Integration with OpenWeatherMap for live weather data.
* Simple, efficient routing powered by React-Router.
* Data fetching, caching and error handling using React-Query.
* Well-designed native state management using the React `Context` API with `useReducer`.
* Dashboard data persisted to browser's local storage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: public/screenshot.jpg
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white
[vite-url]: https://vite.dev/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://react.dev/
[firebase]: https://img.shields.io/badge/Firebase-0396E5?style=for-the-badge&logo=firebase&logoColor=FFCA28
[firebase-url]: https://firebase.google.com/
[jest]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=red
[jest-url]: https://jestjs.io/
[react-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://reactrouter.com/
[react-query]: https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=fff
[react-query-url]: https://tanstack.com/query/v3/
[unsplash]: https://img.shields.io/badge/Unsplash-000000?style=for-the-badge&logo=Unsplash&logoColor=white
[unsplash-url]: https://unsplash.com/
[openweathermap]: https://img.shields.io/badge/OpenWeatherMap-3693F3?style=for-the-badge&logo=icloud&logoColor=fff
[openweathermap-url]: https://openweathermap.org/api
[mui]: https://img.shields.io/badge/MUI-0073e6?style=for-the-badge&logo=MUI&logoColor=white
[mui-url]: https://mui.com/
