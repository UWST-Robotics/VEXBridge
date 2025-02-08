#!/bin/bash

# Copy files in /dist to /debian/opt/vexbridge
cp -r dist debian/opt/vexbridge

# Build debian package
dpkg-deb --build debian dist/vexbridge.deb