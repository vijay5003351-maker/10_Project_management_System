pipeline{
    agent any 
    environment{
        CLIENT_IMAGE = '01_pms_client:jenkins'
        SERVER_IMAGE = '01_pms_server:jenkins'
        APPLICATION_URL= "http://localhost:3000"
        PORT=4500
        db= "mongodb://mongo:27017/project"
    }
    stages{
        stage("check out repo"){
            steps{
                git url : 'https://github.com/manojkumar-g8/01_Project_Management_System.git', branch : 'main'
            }
        }
        stage('set ENV for server'){
            steps{
                sh '''
                mkdir -p Server
                cat > Server/.env <<EOF
                PORT=$PORT
                db=$db
                APPLICATION_URL=$APPLICATION_URL
                '''
            }
        }
        stage('to create docker image'){
            steps{
                sh '''
                echo "to create the docker server image "
                docker build -t $SERVER_IMAGE ./Server
                echo "to create the docker client image"
                docker build -t $CLIENT_IMAGE ./Client --build-arg VITE_REACT_API_URL=http://localhost:4500

                '''
            }
        }
        stage("to run docker compose"){
            steps{
                sh '''
                echo "to run docker compose to build "
                docker compose up --build -d

                echo "docker list runnig constainer "
                docker ps -a 
                
                '''
            }
        }

    }
}