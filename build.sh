#! /bin/bash

echo "##########"
echo "Start builing.."
echo "##########"



yarn build

if [ $? -eq 0 ]
then
  echo "> Build Passed.."
  echo "> Remove Old Images.."
  echo ""
  docker stop je
  docker rm je
  docker rmi mojisejr/jaothui-engine:v1.0
  echo ""
  echo "> Old Image Removed.."
  echo "--> Start building new image"
  docker build -t mojisejr/jaothui-engine:v1.0 . 

  if [ $? -eq 0 ]
  then
    echo ""
    echo "--> Building Completed.."
    docker images
  else
    echo ""
    echo "--> Building Failed.., try again"
  fi
  echo ""
  echo "> Process done.";
fi
