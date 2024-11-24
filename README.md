
# Blockchain Quiz API


## API Endpoints

### 1. **Get All Questions**
- **Method**: GET
- **Endpoint**: `/api/questions`
  
  Retrieves a list of all quiz questions.

  **Response Example** (JSON):
  ```
  [
    {
      "_id": "60f1b09e1c923d1d4cb1fd4a",
      "question": "What is Blockchain?",
      "options": ["A decentralized database", "A type of cryptocurrency", "A company", "A software"],
      "correctAnswer": "A decentralized database"
    },
    {
      "_id": "60f1b09e1c923d1d4cb1fd4b",
      "question": "What does NFT stand for?",
      "options": ["Non-Fungible Token", "Network File Transfer", "National Financial Trading", "None of the above"],
      "correctAnswer": "Non-Fungible Token"
    }
  ]

  ```

### 2. **Submit Answers**
- **Method**: POST
- **Endpoint**: `/api/submit-answer`
  
  Allows users to submit answers to the quiz questions and get their score.

  **Request Body** (JSON):
  ```
  {
    "userId": "user123",
    "answers": [
      { "questionId": "60f1b09e1c923d1d4cb1fd4a", "answer": "A decentralized database" },
      { "questionId": "60f1b09e1c923d1d4cb1fd4b", "answer": "Non-Fungible Token" }
    ]
  }
  ```

  **Response Example** (JSON):
  ```
  {
    "score": 2
  }
  ```

  If any of the answers are incorrect, the score will reflect the number of correct answers.

---

### 3. **Get All Scores**
- **Method**: GET
- **Endpoint**: `/api/scores`
  
  Retrieves the scores of all users who have participated in the quiz.

  **Response Example** (JSON):
  ```
  [
    {
      "_id": "60f1b09e1c923d1d4cb1fd4c",
      "userId": "user123",
      "score": 2
    },
    {
      "_id": "60f1b09e1c923d1d4cb1fd4d",
      "userId": "user456",
      "score": 1
    }
  ]
  ```

---

### 4. **Get Score by User ID**
- **Method**: GET
- **Endpoint**: `/api/scores/:userId`
  
  Retrieves the score of a user by their unique `userId`.

  **Response Example** (JSON):
  ```
  {
    "_id": "60f1b09e1c923d1d4cb1fd4c",
    "userId": "user123",
    "score": 2
  }
  ```

  If the user does not have a score, the server will return a `404` status with the message `Score not found for this user`.

---

## Tech Stack

- NodeJS
- ExpressJS
- Mongooose

---

This API is hosted live, check links section on github
