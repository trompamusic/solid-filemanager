import React, { Component } from 'react';
import FileList from './Components/FileList/FileList';
import Navbar from './Components/Navbar/Navbar';
import ContextMenu from './Components/ContextMenu/ContextMenu';
import Dialogs from './Components/Dialogs/Dialogs';

import { MuiThemeProvider as MaterialUI, createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { initApp, MyDispatch, closeContextMenu } from './Actions/Actions';
import DynamicSnackbar from './Components/Notification/DynamicSnackbar';
import HistoryHandler from './Components/HistoryHandler/HistoryHandler';
import { AppState } from './Reducers/reducer';
import { FolderItem, Item } from './Api/Item';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2B44FF',
        },
        secondary: {
            main: '#ea6135',
        },
    },
    typography: {
        useNextVariants: true,
    }
});

class App extends Component<AppProps> {

    state = {
        dialogOpen:false,
    };
    componentDidMount() {
        this.props.init();
    };
    componentDidUpdate(prevProps: StateProps){
        if(prevProps.selectedItem !== this.props.selectedItem){
            this.postMessage();
        }
    }
    postMessage(){
        const { selectedItem } = this.props;

        const item: selectedItem|undefined = selectedItem?
            {
                name     : selectedItem._name,
                path     : selectedItem._path,
                url      : selectedItem._url,
                size     : selectedItem._size,
                isFolder : selectedItem instanceof FolderItem,
            }: undefined

        window.parent && window.parent.postMessage({ selectedItem: item }, "*");
    }
    searchFile(val:any){
        this.setState({dialogOpen:val});
    }

    render() {
        return (
            <div className="App">
                <MaterialUI theme={theme}>
                    <div onClick={this.props.handleHideContextMenu} onContextMenu={this.props.handleHideContextMenu}>
                        <Navbar />
                        <FileList />
                        <ContextMenu />
                        <DynamicSnackbar />
                        <Dialogs />
                    </div>
                </MaterialUI>
                <HistoryHandler />
            </div>
        );
    }
}
interface StateProps {
    selectedItem: Item;
}
interface DispatchProps {
    init(): void;
    handleHideContextMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

interface selectedItem {
    name    : string;
    path    : string[];
    url     : string;
    size?   : string;
    isFolder: boolean;
}

interface AppProps extends StateProps, DispatchProps {};

const mapStateToProps = (state: AppState): StateProps => {
    const selectedItem: Item = state.items.selected[0];
    return {
        selectedItem,
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        init: () => {
            dispatch(initApp());
        },

        handleHideContextMenu: (event) => {
            const element = event.target as HTMLElement;
            if (!(element.tagName === 'INPUT' || /label/i.test(element.className))) {
                event.preventDefault();
            }
            dispatch(closeContextMenu());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
