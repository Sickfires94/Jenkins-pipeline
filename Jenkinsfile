pipeline {
    agent any
    stages {    
        stage('Build docker image'){
            steps{
                script{
                    sh 'docker build -t sickfires/iba-gke-cicd .'
                }
            }
        }
        stage('Push image to Hub'){
            steps{
                script{
                   withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                   sh 'docker login -u sickfires -p ${dockerhubpwd}'

}
                   sh 'docker push sickfires/jenkins-pipeline'
                }
            }
        }
        stage('Deploy to k8s'){
            steps{
                script{
                    kubernetesDeploy (configs: 'deploymentservice.yaml',kubeconfigId: 'k8sconfigpwd')
                }
            }
        }
    }
}
    }
}
