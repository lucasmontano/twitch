PROJECT_BASE=$(pwd)

function dkup {
  CD=$(pwd)
  cd $PROJECT_BASE
  docker-compose up
  exitcode=$?
  cd $CD
  return $exitcode
}

function dkdown {
  CD=$(pwd)
  cd $PROJECT_BASE
  docker-compose down
  exitcode=$?
  cd $CD
  return $exitcode
}

function dk {
  docker-compose run --rm "app" $@
}

function pkg_install {
  CD=$(pwd)
  cd $PROJECT_BASE
  docker-compose run --rm app npm i
  cd $CD
}

function setup_dev_environment {
  cp .env.example .env
  pkg_install
}
