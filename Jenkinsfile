pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh npm install
                sh ng build
            }

        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            when {
                branch 'master' // Only runs this stage if the branch is master
            }
            steps {
                echo 'Deploying to production...'
                echo ng deploy
            }
        }
    }
}
