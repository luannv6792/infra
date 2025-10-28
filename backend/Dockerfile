# backend/Dockerfile
FROM python:3.11-slim

# install build deps needed by psycopg2 (safe choice)
USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# copy requirements first to leverage docker cache
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# copy app
COPY . /app

EXPOSE 8000

# run with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
