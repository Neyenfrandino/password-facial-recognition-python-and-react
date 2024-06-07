from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.routes import user

app = FastAPI()


# Añadir el middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

# Incluir el router del módulo user
app.include_router(user.router)

if __name__ == "__main__":
    uvicorn.run("main:app", port=8001, reload=True)
