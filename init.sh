#!/usr/bin/env bash
set -o errexit
die() { set +v; echo "$*" 1>&2 ; exit 1; }

# TODO: If the setup process for new developers can be described clearly,
# it should be possible to capture it in a script.
#
# Reference this script from the README if you implement it.
#
# This script may also be used in the Github workflows, to make sure it keeps working.