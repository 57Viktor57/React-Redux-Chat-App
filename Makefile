install: install-deps install-flow-typed

start:
	npx nodemon --exec npx babel-node server/bin/slack.js

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

lint:
	npx eslint . --ext .js --ext .jsx

publish:
	npm publish
