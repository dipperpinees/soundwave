pipeline {
    agent any

    environment {
        GOOGLE_CLIENT_ID = credentials('GOOGLE_CLIENT_ID')
    }

    stages {
        stage('Pushing image') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t dipperpinees/soundwave --build-arg GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID  .'
                    sh 'docker push dipperpinees/soundwave'
                }
            }
        }
    }

    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}
