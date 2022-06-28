# Subtitler

Source code for the Subtitler App.

Subtitler is an Electron based application that can be used to create and edit `.srt` files which are used to caption videos and movies.

`.srt` files are quite tedious to edit in a regular text editor due to the format of `.srt` files. Subtitler makes this easier by keeping track of the indexes for each caption, while also making it easier to add, remove, and edit subtitles.

## Features

### Validation

Subtitler will check caption timestamps to ensure that they do not overlap in an invalid way. Certain overlaps are allowed. For example, a long caption may overlap with several shorter ones. However, a caption that starts _before_ a previous caption is invalid, and Subtitler will check for these.

### Shifting Timestamps

A core feature of Subtitler is the ability to edit multiple captions in a subtitle file at the same time.

For example, the timestamps in a subtitles file may be offset from the audio by some amount. Most video players can offset the audio to account for this, however Subtitler can simply offset the timestamps in the `.srt` file instead, fixing the issue permanently.

Of course, an individual caption's timestamp may also be edited, since it's also common for single captions to be incorrectly offset by some amount.

### UI

Subtitler also has a UI with light and dark modes, as well as support for internationalization.
