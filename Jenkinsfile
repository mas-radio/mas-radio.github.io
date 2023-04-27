pipeline {
  agent none
  stages {
    stage ('setup-worktree'){
      agent any
      when{
        branch 'env'
      }
      steps{
          sh 'git config core.sshCommand "ssh -vvv"'
          checkout scmGit(branches: [[name: 'www']], extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'www']], userRemoteConfigs: [[credentialsId: 'github-emirhg-ssh-key', url: 'git@github.com:mas-radio/mas-radio.github.io.git']])
          sh 'git -C www checkout www'
      }
    }
    stage('install-dependencies') {
      agent { docker { image 'node:18.18.2-alpine3.18' } }
      steps{
        sh 'npm i'
      }
    }
    stage('build') {
      agent { docker { image 'node:18.18.2-alpine3.18' } }
      steps {
        sh 'npm run build'
      }
    }
    stage('deploy-to-stagging') {
      agent any
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS' 
        }
        branch 'env'
      }
      steps {
        tool name: 'git', type: 'git'
        withCredentials([sshUserPrivateKey(credentialsId: 'github-emirhg-ssh-key', keyFileVariable: 'KEYFILE', passphraseVariable: 'PASSPHRASE', usernameVariable: 'USERNAME', gitToolName: 'git')]) {
          sh 'git -C www add -A'
          //catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
          sh 'git -C www commit -am "new: test: Testing deployment to Github Pages"'
          //}
          sh "git -c core.sshCommand=\"ssh -i ${env.KEYFILE}\" -C www push"
        }
      }
    }
    stage('deploy-to-production') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS' 
        }
        branch 'main'
      }
      agent any
      steps {
        ftpPublisher alwaysPublishFromMaster: false, masterNodeName: '', paramPublish: [parameterName:""], continueOnError: false, failOnError: false, publishers: [[configName: 'Más Radio', transfers: [[asciiMode: false, cleanRemote: false, excludes: '', flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: 'www/', sourceFiles: 'www/**']], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false]]
        echo 'Hello world!'
      }
    }
  }
}
