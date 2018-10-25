#!/usr/bin/env bash

version="latest"
nameService="coffee"
## Print Help
function print_help
{
    echo "Usage: create_docker_image [OPTIONS]"
    echo "Possibles Options:"
    echo "  -v --> Version: latest, v1, v2"
}
## Read Parameters
while [ "$1" != "" ]; do
    case $1 in
        -v | --version)     shift
                            version=$1
                            ;;
        -h | --help)        shift
                            print_help
                            exit
                            ;;
    esac
    shift
done

echo "Creating docker image, $version version"
## Delete the docker files
docker rmi -f ${nameService}:${version}
docker rmi -f cornerjob/${nameService}:${version}
## Build new Docker
docker build -f Dockerfile -t cornerjob/${nameService}:${version} .

