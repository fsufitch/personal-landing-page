#/bin/bash
set -e

case "$(uname -m)" in
x64 | x86_64)
    echo 'https://nodejs.org/dist/v19.3.0/node-v19.3.0-linux-x64.tar.xz'
    ;;
aarch64_be | aarch64 | armv8b | armv8l | arm64)
    echo 'https://nodejs.org/dist/v19.3.0/node-v19.3.0-linux-arm64.tar.xz'
    ;;
arm | armv7l)
    echo 'https://nodejs.org/dist/v19.3.0/node-v19.3.0-linux-armv7l.tar.xz'
    ;;
*)
    echo \"No Node binaries available for platform $(uname -m)\" >/dev/stderr
    exit 1
    ;;
esac
