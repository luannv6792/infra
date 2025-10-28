pipeline {
  agent any

  environment {
    //DOCKERHUB_USER = credentials('dockerhub-user')
    //DOCKERHUB_PASS = credentials('dockerhub-pass')
    //IMAGE_NAME = 'luannv67922/php'
    DOCKERHUB_CREDENTIALS = 'dockerhub'
  }

  stages {
    stage('Clone') {
      steps {
        git branch: 'main', url: 'https://github.com/luannv6792/infra.git'
      }
    }
/*
    stage('Build & Push Frontend') {
      steps {
        sh """
          cd frontend
          docker build -t $DOCKERHUB_USER/frontend-app:$BUILD_NUMBER .
          echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
          docker push $DOCKERHUB_USER/frontend-app:$BUILD_NUMBER
        """
      }
    }

    stage('Build & Push Backend') {
      steps {
        sh """
          cd backend
          docker build -t $DOCKERHUB_USER/backend-app:$BUILD_NUMBER .
          echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
          docker push $DOCKERHUB_USER/backend-app:$BUILD_NUMBER
        """
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh """
          kubectl apply -f k8s/postgres.yml -n app
          kubectl apply -f k8s/backend.yml -n app
          kubectl apply -f k8s/frontend.yml -n app
        """
      }
    }
*/
    stage('Deploy to Kubernetes') {
      steps {
        sh "kubectl apply -f k8s/postgres_deployment.yml"
      }
    }
  }
}
