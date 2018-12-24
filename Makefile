install: install-deps

start:
	npm run dev

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

lint:
	npx eslint . --ext .js --ext .jsx

publish:
	npm publish
