#!/usr/bin/env bash
set -o errexit
die() { set +v; echo "$*" 1>&2 ; exit 1; }

# TODO: If you are using multiple testing tools,
# it may be useful to give developers a single script that runs everything locally.
#
# Do not recommend referencing this script from the Github workflows:
# They will run faster and the results will be easier to read
# if separate tests have separate workflows.
