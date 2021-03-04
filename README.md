# Solid filemanager

A React-based Solid pod filebrowser with iframe support.

This repository is a clone of the [solid-filemanager](https://github.com/Otto-AA/solid-filemanager) by Otto-AA, with some minor changes:
- Added a postMessage to the parent window when an item is selected, to support using the filemanager inside an iframe of another application
- Disabled some features (such as 'create file') to present a minimized version, focussing on file selection and upload only
- Updated some styling for use within Trompa projects, such as the [Trompa Campaign Manager](https://github.com/trompamusic/trompa-campaign-manager).


The Solid filemanager is hosted by Videodock for use within Trompa projects:
[solidpodbrowser.trompamusic.eu](http://solidpodbrowser.trompamusic.eu)

## Usage

Usage in an iframe within a React application

```jsx
const MyContainer = () => {

  useEffect(() => {
    const iframeListener = ({ data: { selectedItem } }) => {
      if(!selectedItem) return;

      const { name, url, path, size, isFolder } = selectedItem;
    };

    window.addEventListener('message', iframeListener); 

    return () => window.removeEventListener('message', iframeListener);
  }, []);

  return (
    <iframe src={"http://solidpodbrowserurl"} title={"Solid pod filebrowser"} />
  );
}

```

## Developing
If you want to modify the app, make sure you've installed git, node and npm. Then enter following commands:

'''
git clone https://github.com/otto-aa/solid-filemanager/ # Downloads the source
cd solid-filemenager                                    # Enter the directory
npm install                                             # Install dependencies
npm start                                               # Start the development app
'''

## Hosting
Run a react build from this repository and deploy to a server.
