#!/bin/bash

set -x
set -eo pipefail

npm install -g gulp

npm install --ignore-scripts

gulp publish
