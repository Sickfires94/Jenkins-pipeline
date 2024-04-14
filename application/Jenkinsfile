pipeline {
    environment {
        DOCKER_IMAGE = 'todo-app:latest'
        KUBECONFIG = '/home/jenkins/.kube/config'
        REGISTRY = 'localhost:5000'
    }
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-username/todo-app.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${REGISTRY}/${DOCKER_IMAGE}")
                }
            }
        }
        stage('Push Image to Registry') {
            steps {
                script {
                    docker.withRegistry('http://' + REGISTRY) {
                        docker.image("${REGISTRY}/${DOCKER_IMAGE}").push('latest')
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withKubeConfig(credentialsId: 'kubeconfig-id') {
                        sh 'kubectl apply -f k8s/'
                        sh 'kubectl rollout status deployment/todo-app-deployment'
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'kubectl delete all -l app=todo-app'
        }
    }
}

