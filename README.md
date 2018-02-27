A Node.js hot-loading solution for isomorphic (client and server share code) projects.  
When changes are detected in the source files, bundles for client and server are automatically compiled, and the server module is loaded into the running node instance. The browser is then refreshed, if the changed files were pertinent to the client.

Uses webpack, which runs in the same instance that hot-loads the compiled modules.  
Express is used only for demonstration purposes.

Use `npm start` to test.