#bin/#!/bin/sh

cd src/
npm ci
npm link
cd ../demo
npm ci
npm link nuxt-gallery
npm run dev