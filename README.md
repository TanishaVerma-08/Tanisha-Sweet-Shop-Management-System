# 🍬 Sweet Shop Management System  
**Incubyte Assignment – AI Kata (Python Backend)**

A full-stack **Sweet Shop Management System** built using **Python (FastAPI)** and **React**, following **Test-Driven Development (TDD)**, clean code principles, and responsible **AI-assisted development**.

---

## 🎯 Objective

To design, build, and test a complete sweet shop system showcasing:
- Python-based REST APIs
- Database integration
- Authentication & authorization
- Frontend SPA development
- TDD workflow
- Git discipline and AI transparency

---

## 🏗️ Tech Stack

### Backend
- Python 3.10+, FastAPI
- JWT Authentication
- SQLAlchemy ORM
- PostgreSQL / SQLite
- Pytest, Pydantic
- Uvicorn

### Frontend
- React (Vite)
- Axios
- CSS / Tailwind
- Context API

---
## 📸 Screenshots

---

### 🎨 Frontend Screenshots

#### 🔐 Login Page
![Login Page](Screenshots/frontend/Login_Page.png)

#### 📝 Register Page
![Register Page](Screenshots/frontend/Register_Page.png)

#### 📊 User Dashboard
![User Dashboard](Screenshots/frontend/User_Dashboard.png)

#### 🛠️ Admin Dashboard
![Admin Dashboard](Screenshots/frontend/Admin_Dashboard.png)

#### 🛒 User Cart
![User Cart](Screenshots/frontend/User_Cart.png)

#### 🧺 Admin Cart
![Admin Cart](Screenshots/frontend/Admin_Cart.png)

#### 🔍 Search Bar
![Search Bar](Screenshots/frontend/Search_bar.png)

---

### 🧠 Backend (API & Schema Screenshots)

#### 📡 API Requests
![API Requests](Screenshots/backened/API_Requests.png)

#### 🧾 Token Schema
![Token Schema](Screenshots/backened/Token_Schema.png)

#### 👤 User Create Schema
![User Create Schema](Screenshots/backened/UserCreate_Schema.png)

#### 🔑 User Login Schema
![User Login Schema](Screenshots/backened/UserLogin_Schema.png)

#### 👥 User Output Schema
![User Output Schema](Screenshots/backened/UserOut_Schema.png)

#### 🍬 Sweet Base Schema
![Sweet Base Schema](Screenshots/backened/SweetBase_Schema.png)

#### 🍭 Sweet Response Schema
![Sweet Response Schema](Screenshots/backened/SweetResponse_Schema.png)

#### ✏️ Sweet Update Response Schema
![Sweet Update Response Schema](Screenshots/backened/SweetUpdateResponse_Schema.png)

#### ⚠️ Validation Error Schema
![Validation Error Schema](Screenshots/backened/ValidationError_Schema.png)

#### ❌ HTTP Validation Error Schema
![HTTP Validation Error](Screenshots/backened/HTTPValidationError_Schema.png)

---

## ✨ Key Features

- User registration & login
- JWT-secured APIs
- Role-based access (Admin/User)
- Sweet CRUD operations (Admin)
- Search sweets by name, category, price
- Purchase & restock inventory
- Responsive, modern UI

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint |
|------|---------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

### Sweets
| Method | Endpoint |
|------|---------|
| POST | `/api/sweets` |
| GET | `/api/sweets` |
| GET | `/api/sweets/search` |
| PUT | `/api/sweets/{id}` |
| DELETE | `/api/sweets/{id}` |

### Inventory
| Method | Endpoint |
|------|---------|
| POST | `/api/sweets/{id}/purchase` |
| POST | `/api/sweets/{id}/restock` |

---

## 🧪 Testing (TDD)

- Tests written before implementation
- Red → Green → Refactor cycle
- Unit & integration tests
- Edge cases handled

```bash
pytest
```
