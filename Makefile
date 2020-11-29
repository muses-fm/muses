.PHONY: clean
clean:
	rm -rf .dfx/
	rm -rf dist/
	rm -rf node_modules/

.PHONY: fixtures
fixtures:
	bin/fixtures.sh
