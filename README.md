Here’s a sample `README.md` file for your project:

```markdown
# Data Management Application

This is a simple web application for managing data using a Node.js backend with Express and a React frontend. The app allows users to submit, view, edit, and delete records. The data is stored in a local `data.json` file.

## Features

- **Submit Data:** Users can submit their information (name, email, phone number, and description) via a form.
- **View Data:** The submitted data is displayed in a table.
- **Edit Data:** Users can edit the submitted records in the table.
- **Delete Data:** Users can delete records from the table.
- **Backend:** Data is saved and managed in a `data.json` file using Express API routes.
- **Frontend:** React is used to render the UI and manage state. The app fetches and manipulates data using the provided API.

## Technologies Used

- **Backend:** 
  - Node.js
  - Express.js
  - File System (fs)
  - CORS middleware
  - Body-parser

- **Frontend:** 
  - React.js
  - PropTypes (for type-checking)
  - CSS (for styling)

## Setup Instructions

### Backend Setup (Node.js)

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/data-management-app.git
   ```

2. Navigate to the backend folder and install the required dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

   The backend server will be running on `http://localhost:5000`.

### Frontend Setup (React)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```

   The frontend app will be running on `http://localhost:3000`.

### Interacting with the App

- Open the frontend in your browser and fill out the form to submit data.
- You will see the data displayed in a table with options to edit or delete each record.
- Data is stored in a local `data.json` file, which can be edited by interacting with the app.

## API Endpoints

### POST /submit
- **Description:** Submit new data (name, email, phone number, description).
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phoneNumber": "1234567890",
    "description": "Sample description"
  }
  ```

### GET /data
- **Description:** Retrieve all data.
- **Response:**
  ```json
  [
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phoneNumber": "1234567890",
      "description": "Sample description"
    }
  ]
  ```

### PUT /edit/:index
- **Description:** Edit data at a specific index.
- **Request Body:** The updated data object.
- **Response:** Status message indicating success or failure.

### DELETE /delete/:index
- **Description:** Delete data at a specific index.
- **Response:** Status message indicating success or failure.

## Contributions

Feel free to fork the repository and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.

```

### How to Use:
- Replace `https://github.com/your-username/data-management-app.git` with the actual GitHub repository URL for your project.
- The instructions cover both backend and frontend setup with dependencies and running the app.

Let me know if you need any more details or modifications!
