WebFood2.0
==========

A redesigned front-end website for the Iowa State University online WebFood ordering system

Installation
-------------

These instructions work on Linux and should work on Windows or Mac.

To install, first make sure you have [nodejs](https://nodejs.org) and [npm](https://npmjs.org) installed.

Clone the repo, go into it's root folder, and have npm pull the dependencies for the project:

```bash
	npm install
```

Lastly, start the server:

```bash
	npm start
	# Or, for debugging mode (extra logging to the console):
	DEBUG=WebFood npm start
  # Optionally use a port other than 3000:
	PORT=9000 npm start
```

Then navigate to http://localhost:3000 (or whatever port was chosen)
