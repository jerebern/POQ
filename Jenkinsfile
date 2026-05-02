pipeline {
    agent any

    stages {
        stage('Dep') {
            steps {
                echo 'Install Dep..'
                sh 'npm install'
            }

        }
        stage('Build') {
            steps {
                echo 'Building..'
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
                sh 'ng deploy'
            }
        }
    }
}
