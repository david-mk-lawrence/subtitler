# Common Source Code

The app is somewhat of an isomorphic app, in that the "frontend" (the renderer process) and the "backend" (the main process) share this common code.

The code here is primarily related to declaring types, which helps to ensure that objects in the main process are of the same shape as objects in the renderer.

Code here should not import any vendor code (including node libraries since the nodeIntegration is turned off for the renderer) as there is no guarentee that the lbrary will be available to both processes. (It may however import types from other libraries).
