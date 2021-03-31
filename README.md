# Solid filemanager

A React-based Solid pod filebrowser with iframe support.

This repository is a clone of the [solid-filemanager](https://github.com/Otto-AA/solid-filemanager) by Otto-AA, with some minor changes:
- Added a postMessage to the parent window when an item is selected, to support using the filemanager inside an iframe of another application
- Disabled some features (such as 'create file') to present a minimized version, focussing on file selection and upload only
- Updated some styling for use within Trompa projects, such as the [Trompa Campaign Manager](https://github.com/trompamusic/trompa-campaign-manager).


The Solid filemanager is hosted by Videodock for use within Trompa projects:
[solidpodbrowser.trompamusic.eu](http://solidpodbrowser.trompamusic.eu)

More info about the Trompa project at: [trompamusic.eu](https://trompamusic.eu/)

This repository uses [green-licensed](https://github.com/google/js-green-licenses) dependencies and a couple non-green licensed open source dependencies:
language-subtag-registry@0.3.21 (ODC-By-1.0)
rework@1.0.1 (no license, used by react-scripts) 
standard-http-error@2.0.1 (LAGPL)
standard-error@1.1.0 (LAGPL)

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

## Modifying the app
Make sure you've installed git, node and npm. Then enter the following commands:

```shell
git clone https://github.com/trompamusic/solid-filemanager/ # Downloads the source
cd solid-filemanager                                        # Enter the directory
npm install                                                 # Install dependencies
npm start                                                   # Start the development app
```
