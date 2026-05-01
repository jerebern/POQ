pipeline {
    agent any

    stages {
        stage('Dep') {
            steps {
                sh 'npm install'
            }

        }
        stage('Build') {
            steps {
                sh 'ng build'
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
                echo 'ng deploy'
            }
        }
    }
}
