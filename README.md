# Carbon Footprint API

## About the Project
The Carbon Footprint API is developed to help individuals track their environmental impact by calculating their carbon footprints. Users can assess their total carbon emissions based on factors such as electricity consumption, transportation, and waste production.

## Features
- The errors and UI/UX will be fixed in the next update
- User registration and login
- Secure session management with JWT
- Calculation of carbon footprints
- User profiles and database support

## Technologies
- **Node.js**: For server-side application development
- **Express.js**: Web application framework
- **MongoDB**: Database management
- **Mongoose**: For interaction with MongoDB
- **Bcrypt.js**: For password hashing
- **JSON Web Tokens (JWT)**: For user authentication

## Installation
1. Clone this repository:
    ```bash
    git clone https://github.com/nilayduman/carbon_foot_print-api_dev.git
    cd repositoryname
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file and add the following information:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```

4. Start the server:
    ```bash
    node index.js
    ```

## Usage
- **User Registration**: Send a POST request to the `/register` endpoint to create a new user.
- **User Login**: Send a POST request to the `/login` endpoint to log in and receive a JWT token.
- **Profile Information**: Send a GET request to the `/profile` endpoint to access user profile information.
- **Carbon Footprint Calculation**: Send a POST request to the `/calculate` endpoint to calculate the carbon footprint.

## Contributors
- [timetravellerx18](https://github.com/nilayduman) - Project Developer


## Future Plans
We plan to further develop this project and enhance user experience by adding more features:
- Additional options for calculating environmental impact
- User interface improvements
- Mobile application support
