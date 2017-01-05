#!/bin/bash

BUILD_DIR='build/';
cd $BUILD_DIR && rm -rf *.zip && cd ..
echo -e "Command \033[33m 'gulp build'  executed! \033[0m";
group=$1; # group
repoName=$2; # repo-name
version=$3; # version
gulp build;

if [ $? -eq 0 ];then
    echo -e "\033[33m Command 'gulp build'  completed successfully! \033[0m";
    echo -e "\033[33m '$BUILD_DIR' folder starts to compress! \033[0m";

    pass=$( find $BUILD_DIR -type f | xargs md5 | md5 );

    # echo $pass;
    gulp shell_modify-offline-json --name $pass
    zip $pass.zip $BUILD_DIR && mv $pass.zip $BUILD_DIR;
    if [ $? -eq 0 ];then
        echo -e "\033[33m Compression and encryption complete! \033[0m";
    fi
fi
