#!/bin/bash

# Run build script
npm run build:server

# Copy files in /dist to /debian/opt/vexbridge
cp -r dist debian/opt/vexbridge

# Copy serialport prebuilds to /debian/opt/vexbridge
cp -r node_modules/@serialport/bindings-cpp/prebuilds debian/opt/vexbridge

# Build debian package
dpkg-deb --build debian dist/vexbridge.deb